import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../product';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ProductService } from '../product.service';
import { SubscribeDialogData } from '../subscribe-dialog-data';
import { CartService } from '../cart.service';

@Component({
    selector: 'app-product-detail',
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
    public product$: Observable<Product>;
    public subscribeItems$: Observable<SubscribeDialogData[]>;

    constructor(
        private route: ActivatedRoute,
        private productService: ProductService,
        private cartService: CartService,
    ) {}

    ngOnInit(): void {
        this.product$ = this.route.paramMap.pipe(
            switchMap((params: ParamMap) => this.productService.getProduct(params.get('id'))),
        );
        this.subscribeItems$ = this.productService.subscribeProductItems$;
    }

    public saveProduct(product: Product) {
        this.productService.updateProduct(product)
            .subscribe(() => this.gotoProducts());
    }

    public gotoProducts() {
        this.productService.gotoProducts();
    }

    public addToCart(product: Product): void {
        this.cartService.addToCart(product);
    }

    public subscribeToProduct(product: Product): void {
        this.productService.subscribeToProduct(product);
    }

    public disableSubscribeButton(subscribedProduct: SubscribeDialogData[], id: number) {
        return subscribedProduct.find(sub => sub.product.id === +id);
    }
}
