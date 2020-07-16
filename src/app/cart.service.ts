import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { BrowserStorageService } from './storage.service';
import { CartItem } from './cart-item';
import { filter, map, withLatestFrom } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from './message.service';
import { Product } from './product';
import { ProductService } from './product.service';

@Injectable({
    providedIn: 'root',
})
export class CartService {
    public cartProducts$: Observable<Product[]>;
    public orderPrice$: Observable<number>;

    private readonly _cartItems$ = new BehaviorSubject<CartItem[]>([]);
    public readonly cartItems$: Observable<CartItem[]> = this._cartItems$.asObservable();

    private readonly logSource = 'CartService';
    private readonly storeKey = 'cartItems';

    constructor(
        private http: HttpClient,
        private localStorageService: BrowserStorageService,
        private messageService: MessageService,
        private productService: ProductService,
    ) {
        this._cartItems$.next(this.getItems());
        this.cartItems$.subscribe(value =>
            this.localStorageService.set(this.storeKey, JSON.stringify(value)),
        );
    }

    private getItems(): CartItem[] {
        try {
            return JSON.parse(this.localStorageService.get(this.storeKey)) || [];
        } catch (e) {
            return [];
        }
    }

    public addToCart(product: Product): void {
        if (!this.isProductInCart(product)) {
            this._cartItems$.next([
                ...this._cartItems$.value,
                { productId: product.id, quantity: 1 },
            ]);
        } else {
            if (!this.updateProductQuantity(product)) {
                this.messageService.openSnackBar('The product is out of stock', 'Ok', 2000);
                return;
            }
        }
        this.messageService.openSnackBar('Product successfully added to cart', 'Ok', 2000);
        this.messageService.log(this.logSource, `${product.name} successfully added to cart`);
    }

    private isProductInCart(product: Product): boolean {
        const foundIndex = this.foundProductIndex(product);
        return foundIndex !== -1;
    }

    private updateProductQuantity(product: Product): boolean {
        const foundIndex = this.foundProductIndex(product);
        const foundItem = this._cartItems$.value[foundIndex];
        if (foundItem.quantity >= product.inStock) {
            return false;
        }
        const itemsClone = this._cartItems$.value.slice();
        itemsClone.splice(foundIndex, 1, {
            ...foundItem,
            quantity: foundItem.quantity + 1,
        });
        this._cartItems$.next(itemsClone);
        return true;
    }

    private foundProductIndex(product: Product): number {
        return this._cartItems$.value.findIndex(i => i.productId === product.id);
    }

    public clearCart(): void {
        this._cartItems$.next([]);
        this.messageService.log(this.logSource, `Cart has been cleared`);
    }

    public deleteProductFromCart(index: number, product: Product): void {
        const itemsClone = this._cartItems$.value.slice();
        itemsClone.splice(index, 1);
        this._cartItems$.next(itemsClone);
        this.messageService.openSnackBar('Product successfully removed from cart', 'Ok', 2000);
        this.messageService.log(this.logSource, `${product.name} successfully removed from cart`);
    }

    public setCartProducts(): void {
        this.cartProducts$ = combineLatest([this.productService.products$, this.cartItems$]).pipe(
            filter(([products]) => Boolean(products)),
            map(([products, cartItems]) => this.cartItemsToProducts(products, cartItems)),
        );
    }

    private cartItemsToProducts(products: Product[], cartItems: CartItem[]): Product[] {
        return cartItems.map(item => {
            return products.find(product => product.id === item.productId);
        });
    }

    public setOrderPrice(): void {
        this.orderPrice$ = this.cartProducts$.pipe(
            withLatestFrom(this.cartItems$),
            map(([products, cartItems]) => this.getTotalPrice(products, cartItems)),
        );
    }

    private getTotalPrice(products: Product[], cartItems: CartItem[]): number {
        return cartItems.reduce(
            (total, cartItem, index) => total + cartItem.quantity * products[index].price,
            0,
        );
    }
}
