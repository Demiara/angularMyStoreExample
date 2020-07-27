import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Order } from '../models/order';
import { Product } from '../models/product';
import { Shipping } from '../models/shipping';
import { handleError } from '../utils/api.util';
import { MessageService } from './message.service';
import { ProductService } from './product.service';

@Injectable({
    providedIn: 'root',
})
export class OrderService {
    public products: Product[];
    public shippings: Shipping[];

    private readonly httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    private readonly logSource = 'OrderService';
    private readonly ordersUrl = 'api/orders';

    constructor(
        private http: HttpClient,
        private messageService: MessageService,
        private productService: ProductService,
        private router: Router,
    ) {
        this.productService.products$.subscribe(products => (this.products = products));
        this.getShippingPrices().subscribe(shippings => (this.shippings = shippings));
    }

    public getShippingPrices(): Observable<any> {
        return this.http.get('/assets/shipping.json');
    }

    public addOrder(order: Order): Observable<Order> {
        return this.http.post<Order>(this.ordersUrl, order, this.httpOptions).pipe(
            tap((newOrder: Order) => {
                this.messageService.log(this.logSource, `Added order w/ id=${newOrder.id}`);
                this.messageService.openSnackBar(
                    'Your order has been successfully created',
                    'Ok',
                    5000,
                );
            }),
            catchError(handleError('addOrder', order)),
        );
    }

    public getOrder(id: number | string): Observable<Order> {
        return this.getOrders().pipe(
            map((orders: Order[]) => orders.find(order => order.id === +id)),
        );
    }

    public getOrders(): Observable<Order[]> {
        return this.http.get<Order[]>(this.ordersUrl).pipe(
            tap(() => this.messageService.log(this.logSource, 'fetched orders')),
            catchError(handleError<Order[]>('getOrders', [])),
        );
    }

    public getOrderProduct(id: number): Product {
        return this.products.find(product => product.id === id);
    }

    public getOrderShippingCost(id: number | string, type?: string): number | string {
        const shippingCost = this.shippings.find(shipping => shipping.id === +id);
        return type === 'name' ? shippingCost.type : shippingCost.price;
    }

    public gotoOrder(order: Order): void {
        const orderId = order ? order.id : null;
        this.router.navigate(['/orders', orderId]);
    }

    public gotoOrders(): void {
        this.router.navigate(['/orders']);
    }

    public updateOrder(order: Order): Observable<any> {
        return this.http.put(this.ordersUrl, order, this.httpOptions).pipe(
            tap(() => {
                this.messageService.log(this.logSource, `canceled order id=${order.id}`);
                this.messageService.openSnackBar(
                    'Your order has been successfully canceled',
                    'Ok',
                    2000,
                );
            }),
            catchError(handleError<any>('updateOrder')),
        );
    }
}
