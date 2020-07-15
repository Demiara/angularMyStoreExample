import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../product';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ProductService } from '../product.service';

@Component({
    selector: 'app-product-detail',
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
    public product$: Observable<Product>;

    constructor(private route: ActivatedRoute, private productService: ProductService) {}

    ngOnInit(): void {
        this.product$ = this.route.paramMap.pipe(
            switchMap((params: ParamMap) => this.productService.getProduct(params.get('id'))),
        );
    }

    saveProduct(product: Product) {}

    gotoProducts() {}
}
