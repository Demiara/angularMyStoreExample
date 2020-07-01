import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { CartService } from '../cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[];
  displayedColumns: string[] = ['id', 'name', 'price', 'inStock', 'description', 'buyCol'];

  constructor(private productService: ProductService,
              private cartService: CartService,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getProducts()
      .subscribe(products => this.products = products);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  addToCart(product: Product) {
    const isAdd = this.cartService.addToCart(product);
    if (isAdd) {
      this.openSnackBar('Product successfully added to cart', 'Ok');
    } else {
      this.openSnackBar('The product is out of stock', 'Ok');
    }
  }
}
