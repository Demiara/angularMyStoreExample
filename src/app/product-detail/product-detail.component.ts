import { ActivatedRoute, ParamMap } from '@angular/router';
import { CartService } from '../cart.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { SubscribeDialogData } from '../subscribe-dialog-data';
import { switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-product-detail',
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
    public product$: Observable<Product>;
    public subscribeItems$: Observable<SubscribeDialogData[]>;

    constructor(
        private cartService: CartService,
        private productService: ProductService,
        private route: ActivatedRoute,
    ) {}

    public ngOnInit(): void {
        this.product$ = this.route.paramMap.pipe(
            switchMap((params: ParamMap) => this.productService.getProduct(params.get('id'))),
        );
        this.subscribeItems$ = this.productService.subscribeProductItems$;
    }

    public addToCart(product: Product): void {
        this.cartService.addToCart(product);
    }

    public disableSubscribeButton(subscribedProduct: SubscribeDialogData[], id: number): boolean {
        return !!subscribedProduct.find(sub => sub.product.id === +id);
    }

    public gotoProducts(): void {
        this.productService.gotoProducts();
    }

    public saveProduct(product: Product): void {
        this.productService.updateProduct(product)
            .subscribe(() => this.gotoProducts());
    }

    public subscribeToProduct(product: Product): void {
        this.productService.subscribeToProduct(product);
    }
}
