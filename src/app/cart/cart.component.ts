import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { CartItem } from '../cart-item';
import { ProductService } from '../product.service';
import { combineLatest, Observable } from 'rxjs';
import { Product } from '../product';
import { filter, map, withLatestFrom } from 'rxjs/operators';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
    public cartItems$: Observable<CartItem[]>;
    public totalPrice$: Observable<number>;
    public cartProducts$: Observable<Product[]>;

    constructor(private productService: ProductService, private cartService: CartService) {}

    ngOnInit(): void {
        this.cartItems$ = this.cartService.cartItems$;
        this.setCartProducts();
        this.setTotalPrice();
    }

    public deleteProductFromCart(index: number, product: Product): void {
        this.cartService.deleteProductFromCart(index, product);
    }

    public clearCart(): void {
        this.cartService.clearCart();
    }

    private setCartProducts() {
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

    private setTotalPrice() {
        this.totalPrice$ = this.cartProducts$.pipe(
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
