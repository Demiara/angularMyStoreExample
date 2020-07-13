import { Component, OnInit } from '@angular/core';
import { Order } from '../order';
import { OrderService } from '../order.service';
import { ProductService } from '../product.service';
import { Product } from '../product';
import { Shipping } from '../shipping';

@Component({
    selector: 'app-order-list',
    templateUrl: './order-list.component.html',
    styleUrls: ['./order-list.component.css'],
})
export class OrderListComponent implements OnInit {
    public orders: Order[];
    public products: Product[];
    public shippings: Shipping[];

    constructor(private orderService: OrderService, private productService: ProductService) {}

    public ngOnInit(): void {
        this.orderService.getOrders().subscribe(orders => (this.orders = orders));
        this.productService.products$.subscribe(products => (this.products = products));
        this.orderService.getShippingPrices().subscribe(shippings => (this.shippings = shippings));
    }

    public getOrderProductName(id: number): string {
        const currentProduct = this.products.find(product => product.id === id);
        return currentProduct.name;
    }

    public getOrderShippingCost(id: number, type?: string): number | string {
        const shippingCost = this.shippings.find(shipping => shipping.id === id);
        return type === 'name' ? shippingCost.type : shippingCost.price;
    }

    public deleteOrder(order: Order) {
        this.orders = this.orders.filter(h => h !== order);
        this.orderService.deleteOrder(order).subscribe();
    }
}
