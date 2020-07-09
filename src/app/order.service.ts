import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Order } from './order';
import { MessageService } from './message.service';
import { catchError } from 'rxjs/operators';
import { handleError } from './utils/api-util';

@Injectable({
    providedIn: 'root',
})
export class OrderService {
    private ordersUrl = 'api/orders'; // URL to web api
    private httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    constructor(private http: HttpClient, private messageService: MessageService) {}

    public getShippingPrices(): Observable<any> {
        return this.http.get('/assets/shipping.json');
    }

    public addOrder(order: Order): Observable<Order> {
        return this.http
            .post<Order>(this.ordersUrl, order, this.httpOptions)
            .pipe(catchError(handleError('addOrder', order)));
    }
}
