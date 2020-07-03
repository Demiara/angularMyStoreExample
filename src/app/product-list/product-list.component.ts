import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { CartService } from '../cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { SubscribeDialogData } from '../subscribe-dialog-data';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products$: Observable<Product[]>;
  subscribeItems$: Observable<SubscribeDialogData[]>;
  displayedColumns: string[] = ['id', 'name', 'price', 'inStock', 'description', 'buyCol'];

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.subscribeItems$ = this.productService.subscribeProductItems$;
    this.products$ = this.productService.products$;
  }

  public addToCart(product: Product): void {
    const isAdd = this.cartService.addToCart(product);
    if (isAdd) {
      this.openSnackBar('Product successfully added to cart', 'Ok');
    } else {
      this.openSnackBar('The product is out of stock', 'Ok');
    }
  }

  public subscribeToProduct(product: Product): void {
    this.productService.subscribeToProduct(product);
    // console.log(isSubscriber);
    // if (isSubscriber) {
    //   this.openSnackBar('You have successfully subscribed to the notification', 'Ok');
    // }
  }

  private openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
