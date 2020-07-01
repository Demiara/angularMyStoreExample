import {Injectable, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './product';
import { CartItem } from './cart-item';
import { MessageService } from './message.service';
import { BrowserStorageService } from './storage.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: CartItem[];
  private readonly storeKey = 'cartItems';

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private sessionStorageService: BrowserStorageService,
    private localStorageService: BrowserStorageService,
  ) {
    this.items = this.getItems();
  }

  addToCart(product: Product): boolean {
    const foundIndex = this.items.findIndex(i => i.productId === product.id);
    if (foundIndex === -1) {
      this.items = [...this.items, { productId: product.id, quantity: 1 }];
    } else {
      const foundItem = this.items[foundIndex];
      if (foundItem.quantity >= product.inStock) {
        return false;
      }
      const itemsClone = this.items.slice();
      itemsClone.splice(
        foundIndex,
        1,
        { ...foundItem, quantity: foundItem.quantity + 1 },
      );
      this.items = itemsClone;
    }
    this.localStorageService.set(this.storeKey, JSON.stringify(this.items));
    this.log(`${product.name} successfully added to cart`);
    return true;
  }

  getItems(): CartItem[] {
    try {
      return JSON.parse(this.localStorageService.get(this.storeKey)) || [];
    } catch (e) {
      return [];
    }
  }

  clearCart(): CartItem[] {
    this.items = [];
    return this.items;
  }

  getShippingPrices(): Observable<any> {
    return this.http.get('/assets/shipping.json');
  }

  private log(message: string): void {
    this.messageService.add(`CartService: ${message}`);
  }

}
