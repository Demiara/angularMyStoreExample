import { ActivatedRoute, ParamMap } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../order';
import { OrderService } from '../order.service';
import { Product } from '../product';
import { Shipping } from '../shipping';
import { switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-order-detail',
    templateUrl: './order-detail.component.html',
    styleUrls: ['./order-detail.component.css'],
})
export class OrderDetailComponent implements OnInit {
    public order$: Observable<Order>;
    public productDetailPanelOpen = false;
    public products: Product[];
    public shippings: Shipping[];

    constructor(private route: ActivatedRoute, private orderService: OrderService) {}

    public ngOnInit(): void {
        this.order$ = this.route.paramMap.pipe(
            switchMap((params: ParamMap) => this.orderService.getOrder(params.get('id'))),
        );
        this.products = this.orderService.products;
        this.shippings = this.orderService.shippings;
    }

    public cancelOrder(order: Order): void {
        const canceledOrder = { ...order, canceled: true } as Order;
        this.orderService.updateOrder(canceledOrder).subscribe(() => this.gotoOrders());
    }

    private gotoOrders(): void {
        this.orderService.gotoOrders();
    }

    public getOrderProduct(id: number): Product {
        return this.orderService.getOrderProduct(id);
    }

    public getOrderShippingCost(id: number | string, type?: string): number | string {
        return this.orderService.getOrderShippingCost(id, type);
    }
}
