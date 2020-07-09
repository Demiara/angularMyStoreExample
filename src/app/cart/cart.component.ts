import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { CartItem } from '../cart-item';
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

    constructor(private cartService: CartService) {}

    ngOnInit(): void {
        this.cartItems$ = this.cartService.cartItems$;
        this.setCartProducts();
        this.cartProducts$ = this.cartService.cartProducts$;
        this.setTotalPrice();
        this.totalPrice$ = this.cartService.totalPrice$;
    }

    public deleteProductFromCart(index: number, product: Product): void {
        this.cartService.deleteProductFromCart(index, product);
    }

    public clearCart(): void {
        this.cartService.clearCart();
    }

    private setCartProducts() {
        this.cartService.setCartProducts();
    }

    private setTotalPrice() {
        this.cartService.setTotalPrice();
    }
}
