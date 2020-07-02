import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { CartService } from '../cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products$: Observable<Product[]>;
  displayedColumns: string[] = ['id', 'name', 'price', 'inStock', 'description', 'buyCol'];

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.products$ = this.productService.products$;
  }

  addToCart(product: Product) {
    const isAdd = this.cartService.addToCart(product);
    if (isAdd) {
      this.openSnackBar('Product successfully added to cart', 'Ok');
    } else {
      this.openSnackBar('The product is out of stock', 'Ok');
    }
  }

  private openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
