import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './product';
import { CartItem } from './cart-item';
import { MessageService } from './message.service';
import { BrowserStorageService } from './storage.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly storeKey = 'cartItems';

  private readonly _cartItems$ = new BehaviorSubject<CartItem[]>([]);
  public readonly cartItems$: Observable<CartItem[]> = this._cartItems$.asObservable();

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private localStorageService: BrowserStorageService,
  ) {
    this._cartItems$.next(this.getItems());
    this.cartItems$.subscribe(value =>
      this.localStorageService.set(this.storeKey, JSON.stringify(value)),
    );
  }

  public addToCart(product: Product): boolean {
    if (!this.isProductInCart(product)) {
      this._cartItems$.next([...this._cartItems$.value, { productId: product.id, quantity: 1 }]);
    } else {
      const isUpdated = this.updateProductQuantity(product);
      if (!isUpdated) {
        return false;
      }
    }
    this.log(`${product.name} successfully added to cart`);
    return true;
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

  public deleteProductFromCart(index: number, product: Product): void {
    const itemsClone = this._cartItems$.value.slice();
    itemsClone.splice(index, 1);
    this._cartItems$.next(itemsClone);
    this.log(`${product.name} successfully removed from cart`);
  }

  public clearCart(): void {
    this._cartItems$.next([]);
    this.log(`Cart has been cleared`);
  }

  getShippingPrices(): Observable<any> {
    return this.http.get('/assets/shipping.json');
  }

  private log(message: string): void {
    this.messageService.add(`CartService: ${message}`);
  }
}
