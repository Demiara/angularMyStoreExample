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
    public productDetailPanelOpen = false;

    constructor(private route: ActivatedRoute, private orderService: OrderService) {}

    public ngOnInit(): void {
        this.order$ = this.route.paramMap.pipe(
            switchMap((params: ParamMap) => this.orderService.getOrder(params.get('id'))),
        );
        this.products = this.orderService.products;
        this.shippings = this.orderService.shippings;
    }

    public gotoOrders() {
        this.orderService.gotoOrders();
    }

    public cancelOrder(order: Order): void {
        const canceledOrder = { ...order, canceled: true } as Order;
        this.orderService.updateOrder(canceledOrder).subscribe(() => this.gotoOrders());
    }

    public getOrderProduct(id: number): Product {
        return this.orderService.getOrderProduct(id);
    }

    public getOrderShippingCost(id: number | string, type?: string): number | string {
        return this.orderService.getOrderShippingCost(id, type);
    }
}
