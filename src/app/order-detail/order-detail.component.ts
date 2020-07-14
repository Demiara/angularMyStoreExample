import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { OrderService } from '../order.service';
import { Observable } from 'rxjs';
import { Order } from '../order';
import { switchMap } from 'rxjs/operators';
import { Product } from '../product';
import { Shipping } from '../shipping';

@Component({
    selector: 'app-order-detail',
    templateUrl: './order-detail.component.html',
    styleUrls: ['./order-detail.component.css'],
})
export class OrderDetailComponent implements OnInit {
    public order$: Observable<Order>;
    public products: Product[];
    public shippings: Shipping[];

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private service: OrderService,
    ) {}

    public ngOnInit(): void {
        this.order$ = this.route.paramMap.pipe(
            switchMap((params: ParamMap) => this.service.getOrder(params.get('id'))),
        );
        this.products = this.service.products;
        this.shippings = this.service.shippings;
    }

    public gotoOrders(order: Order) {
        const orderId = order ? order.id : null;
        this.router.navigate(['/orders', { id: orderId }]);
    }

    public getOrderProductName(id: number): string {
        return this.service.getOrderProductName(id);
    }

    public getOrderShippingCost(id: number | string, type?: string): number | string {
        return this.service.getOrderShippingCost(id, type);
    }
}
