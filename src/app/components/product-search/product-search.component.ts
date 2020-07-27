import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Product } from '../../model/product';
import { ProductService } from '../../service/product.service';

@Component({
    selector: 'app-product-search',
    templateUrl: './product-search.component.html',
    styleUrls: ['./product-search.component.css'],
})
export class ProductSearchComponent implements OnInit {
    public products$: Observable<Product[]>;
    private searchTerms = new Subject<string>();

    constructor(private productService: ProductService) {}

    public ngOnInit(): void {
        this.products$ = this.searchTerms.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap((term: string) => this.productService.searchProducts(term)),
        );
    }

    public search(term: string): void {
        this.searchTerms.next(term);
    }
}
