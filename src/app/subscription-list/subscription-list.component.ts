import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductService } from '../product.service';
import { SubscribeDialogData } from '../subscribe-dialog-data';

@Component({
    selector: 'app-subscription-list',
    templateUrl: './subscription-list.component.html',
    styleUrls: ['./subscription-list.component.css'],
})
export class SubscriptionListComponent implements OnInit {
    public subscribeItems$: Observable<SubscribeDialogData[]>;

    constructor(private productService: ProductService) {}

    public ngOnInit(): void {
        this.subscribeItems$ = this.productService.subscribeProductItems$;
    }

    public unsubscribeItem(index: number, subscribe: SubscribeDialogData): void {
        this.productService.unsubscribeItem(index, subscribe);
    }
}
