import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Order } from './order';
import { MessageService } from './message.service';
import { catchError, tap } from 'rxjs/operators';
import { handleError } from './utils/api-util';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root',
})
export class OrderService {
    private ordersUrl = 'api/orders'; // URL to web api
    private httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    constructor(
        private http: HttpClient,
        private messageService: MessageService,
        private snackBar: MatSnackBar,
    ) {}

    public getShippingPrices(): Observable<any> {
        return this.http.get('/assets/shipping.json');
    }

    public addOrder(order: Order): Observable<Order> {
        return this.http.post<Order>(this.ordersUrl, order, this.httpOptions).pipe(
            tap((newOrder: Order) => this.log(`Added order w/ id=${newOrder.id}`)),
            tap(() =>
                this.openSnackBar(
                    'Your order has been successfully сreated',
                    'Ok',
                ),
            ),
            catchError(handleError('addOrder', order)),
        );
    }

    public getOrders(): Observable<Order[]> {
        return this.http.get<Order[]>(this.ordersUrl).pipe(
            tap(_ => this.log('fetched orders')),
            catchError(handleError<Order[]>('getOrders', [])),
        );
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
