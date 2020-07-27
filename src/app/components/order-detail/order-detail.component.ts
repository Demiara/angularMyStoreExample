import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Order } from '../../model/order';
import { Product } from '../../model/product';
import { Shipping } from '../../model/shipping';
import { OrderService } from '../../service/order.service';

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
