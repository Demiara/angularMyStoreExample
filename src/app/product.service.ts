import { Injectable } from '@angular/core';
import { Product } from './product';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, share, startWith, tap } from 'rxjs/operators';
import { muteFirst } from './utils/api-util';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productsUrl = 'api/products'; // URL to web api
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  private readonly _products$ = new BehaviorSubject<Product[]>(null);
  public readonly products$: Observable<Product[]> = muteFirst(
    this.getProducts().pipe(share(), startWith({})),
    this._products$.asObservable()
  );

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl).pipe(
      tap((_) => this.log('fetched products')),
      tap((product) => this._products$.next(product)),
      catchError(this.handleError<Product[]>('productsHeroes', [])),
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      this.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`ProductService: ${message}`);
  }

  constructor(private http: HttpClient, private messageService: MessageService) {}
}
