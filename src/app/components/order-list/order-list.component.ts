import { Component, OnInit } from '@angular/core';
import { Order } from '../../model/order';
import { OrderService } from '../../service/order.service';

@Component({
    selector: 'app-order-list',
    templateUrl: './order-list.component.html',
    styleUrls: ['./order-list.component.css'],
})
export class OrderListComponent implements OnInit {
    public orders: Order[];

    constructor(private orderService: OrderService) {}

    public ngOnInit(): void {
        this.orderService.getOrders().subscribe(orders => (this.orders = orders));
    }
}