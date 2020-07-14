import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Order } from './order';
import { MessageService } from './message.service';
import { catchError, map, tap } from 'rxjs/operators';
import { handleError } from './utils/api-util';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from './product';
import { Shipping } from './shipping';
import { ProductService } from './product.service';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class OrderService {
    public products: Product[];
    public shippings: Shipping[];

    private ordersUrl = 'api/orders'; // URL to web api
    private httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    constructor(
        private http: HttpClient,
        private router: Router,
        private productService: ProductService,
        private messageService: MessageService,
        private snackBar: MatSnackBar,
    ) {
        this.productService.products$.subscribe(products => (this.products = products));
        this.getShippingPrices().subscribe(shippings => (this.shippings = shippings));
    }

    public getShippingPrices(): Observable<any> {
        return this.http.get('/assets/shipping.json');
    }

    public addOrder(order: Order): Observable<Order> {
        return this.http.post<Order>(this.ordersUrl, order, this.httpOptions).pipe(
            tap((newOrder: Order) => this.log(`Added order w/ id=${newOrder.id}`)),
            tap(() => this.openSnackBar('Your order has been successfully сreated', 'Ok')),
            catchError(handleError('addOrder', order)),
        );
    }

    public getOrders(): Observable<Order[]> {
        return this.http.get<Order[]>(this.ordersUrl).pipe(
            tap(_ => this.log('fetched orders')),
            catchError(handleError<Order[]>('getOrders', [])),
        );
    }
    public getOrder(id: number | string) {
        return this.getOrders().pipe(
            map((orders: Order[]) => orders.find(order => order.id === +id)),
        );
    }

    public deleteOrder(order: Order | number): Observable<Order> {
        const id = typeof order === 'number' ? order : order.id;
        const url = `${this.ordersUrl}/${id}`;
        return this.http.delete<Order>(url, this.httpOptions).pipe(
            tap(_ => this.log(`deleted order id=${id}`)),
            tap(() => this.openSnackBar('Your order has been successfully removed', 'Ok')),
            catchError(handleError<Order>('deleteOrder')),
        );
    }

    public getOrderProduct(id: number): Product {
        return this.products.find(product => product.id === id);
    }

    public getOrderShippingCost(id: number | string, type?: string): number | string {
        const shippingCost = this.shippings.find(shipping => shipping.id === +id);
        return type === 'name' ? shippingCost.type : shippingCost.price;
    }

    public gotoOrders() {
        this.router.navigate(['/orders']);
    }

    public gotoOrder(order: Order) {
        const orderId = order ? order.id : null;
        this.router.navigate(['/orders', orderId]);
    }

    private log(message: string): void {
        this.messageService.add(`OrderService: ${message}`);
    }

    private openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 10000,
        });
    }
}
