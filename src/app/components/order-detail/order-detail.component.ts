import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Order } from '../../models/order';
import { Product } from '../../models/product';
import { Shipping } from '../../models/shipping';
import { OrderService } from '../../services/order.service';

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

    public getOrderProduct(id: number): Product {
        return this.orderService.getOrderProduct(id);
    }

    public getOrderShippingCost(id: number | string, type?: string): number | string {
        return this.orderService.getOrderShippingCost(id, type);
    }

    public gotoOrders(): void {
        this.orderService.gotoOrders();
    }
}
