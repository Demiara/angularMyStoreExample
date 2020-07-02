import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { CartItem } from '../cart-item';
import { ProductService } from '../product.service';
import { Observable } from 'rxjs';
import { Product } from '../product';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems: CartItem[];
  cartProducts$: Observable<Product[]>;

  constructor(private cartService: CartService, private productService: ProductService) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getItems();
    this.setCartProducts();
  }

  private setCartProducts() {
    this.cartProducts$ = this.productService.products$.pipe(
      filter(products => Boolean(products)),
      map(products => this.cartItemsToProducts(products)),
    );
  }

  private cartItemsToProducts(products: Product[]): Product[] {
    return this.cartItems.map(item => {
      return products.find(product => product.id === item.productId);
    });
  }
}
