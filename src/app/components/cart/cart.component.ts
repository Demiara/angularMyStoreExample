import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CartItem } from '../../models/cart-item';
import { Product } from '../../models/product';
import { CartService } from '../../services/cart.service';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
    public cartItems$: Observable<CartItem[]>;
    public cartProducts$: Observable<Product[]>;
    public orderPrice$: Observable<number>;

    constructor(private cartService: CartService) {}

    public ngOnInit(): void {
        this.cartItems$ = this.cartService.cartItems$;
        this.setCartProducts();
        this.cartProducts$ = this.cartService.cartProducts$;
        this.setOrderPrice();
        this.orderPrice$ = this.cartService.orderPrice$;
    }

    private setCartProducts(): void {
        this.cartService.setCartProducts();
    }

    private setOrderPrice(): void {
        this.cartService.setOrderPrice();
    }

    public clearCart(): void {
        this.cartService.clearCart();
    }

    public deleteProductFromCart(index: number, product: Product): void {
        this.cartService.deleteProductFromCart(index, product);
    }
}
