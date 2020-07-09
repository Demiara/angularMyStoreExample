import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { CartItem } from '../cart-item';
import { Observable } from 'rxjs';
import { Product } from '../product';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
    public cartItems$: Observable<CartItem[]>;
    public orderPrice$: Observable<number>;
    public cartProducts$: Observable<Product[]>;

    constructor(private cartService: CartService) {}

    ngOnInit(): void {
        this.cartItems$ = this.cartService.cartItems$;
        this.setCartProducts();
        this.cartProducts$ = this.cartService.cartProducts$;
        this.setOrderPrice();
        this.orderPrice$ = this.cartService.orderPrice$;
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

    private setOrderPrice() {
        this.cartService.setOrderPrice();
    }
}
