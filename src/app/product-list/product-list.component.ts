import { CartService } from '../cart.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { SubscribeDialogData } from '../subscribe-dialog-data';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
    public readonly displayedColumns: string[] = [
        'id',
        'name',
        'price',
        'inStock',
        'description',
        'buyCol',
    ];
    public products$: Observable<Product[]>;
    public subscribeItems$: Observable<SubscribeDialogData[]>;

    constructor(private productService: ProductService, private cartService: CartService) {}

    public ngOnInit(): void {
        this.subscribeItems$ = this.productService.subscribeProductItems$;
        this.products$ = this.productService.products$;
    }

    public addToCart(product: Product): void {
        this.cartService.addToCart(product);
    }

    public disableSubscribeButton(subscribedProduct: SubscribeDialogData[], product: Product) {
        return subscribedProduct.find(sub => sub.product.id === product.id);
    }

    public subscribeToProduct(product: Product): void {
        this.productService.subscribeToProduct(product);
    }
}
