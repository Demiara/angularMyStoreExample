import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from './product';
import { CartItem } from './cart-item';
import { MessageService } from './message.service';
import { BrowserStorageService } from './storage.service';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { filter, map, withLatestFrom } from 'rxjs/operators';
import { ProductService } from './product.service';

@Injectable({
    providedIn: 'root',
})
export class CartService {
    private readonly storeKey = 'cartItems';

    private readonly _cartItems$ = new BehaviorSubject<CartItem[]>([]);
    public readonly cartItems$: Observable<CartItem[]> = this._cartItems$.asObservable();

    public cartProducts$: Observable<Product[]>;
    public totalPrice$: Observable<number>;

    constructor(
        private http: HttpClient,
        private productService: ProductService,
        private messageService: MessageService,
        private snackBar: MatSnackBar,
        private localStorageService: BrowserStorageService,
    ) {
        this._cartItems$.next(this.getItems());
        this.cartItems$.subscribe(value =>
            this.localStorageService.set(this.storeKey, JSON.stringify(value)),
        );
    }

    public addToCart(product: Product): void {
        if (!this.isProductInCart(product)) {
            this._cartItems$.next([
                ...this._cartItems$.value,
                { productId: product.id, quantity: 1 },
            ]);
        } else {
            if (!this.updateProductQuantity(product)) {
                this.openSnackBar('The product is out of stock', 'Ok');
                return;
            }
        }
        this.openSnackBar('Product successfully added to cart', 'Ok');
        this.log(`${product.name} successfully added to cart`);
    }

    public deleteProductFromCart(index: number, product: Product): void {
        const itemsClone = this._cartItems$.value.slice();
        itemsClone.splice(index, 1);
        this._cartItems$.next(itemsClone);
        this.openSnackBar('Product successfully removed from cart', 'Ok');
        this.log(`${product.name} successfully removed from cart`);
    }

    public clearCart(): void {
        this._cartItems$.next([]);
        this.log(`Cart has been cleared`);
    }

    public setCartProducts() {
        this.cartProducts$ = combineLatest([this.productService.products$, this.cartItems$]).pipe(
            filter(([products]) => Boolean(products)),
            map(([products, cartItems]) => this.cartItemsToProducts(products, cartItems)),
        );
    }

    public setTotalPrice() {
        this.totalPrice$ = this.cartProducts$.pipe(
            withLatestFrom(this.cartItems$),
            map(([products, cartItems]) => this.getTotalPrice(products, cartItems)),
        );
    }

    private foundProductIndex(product: Product): number {
        return this._cartItems$.value.findIndex(i => i.productId === product.id);
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

    private getItems(): CartItem[] {
        try {
            return JSON.parse(this.localStorageService.get(this.storeKey)) || [];
        } catch (e) {
            return [];
        }
    }

    private cartItemsToProducts(products: Product[], cartItems: CartItem[]): Product[] {
        return cartItems.map(item => {
            return products.find(product => product.id === item.productId);
        });
    }

    private getTotalPrice(products: Product[], cartItems: CartItem[]): number {
        return cartItems.reduce(
            (total, cartItem, index) => total + cartItem.quantity * products[index].price,
            0,
        );
    }

    private log(message: string): void {
        this.messageService.add(`CartService: ${message}`);
    }

    private openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 2000,
        });
    }
}
