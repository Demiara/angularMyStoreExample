import { Injectable } from '@angular/core';
import { Product } from './product';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { catchError, share, startWith, tap } from 'rxjs/operators';
import { muteFirst } from './utils/api-util';
import { SubscribeDialogComponent } from './subscribe-dialog/subscribe-dialog.component';
import { BrowserStorageService } from './storage.service';
import { SubscribeDialogData } from './subscribe-dialog-data';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productsUrl = 'api/products'; // URL to web api
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  private readonly storeKey = 'productSubscribe';

  private readonly _products$ = new BehaviorSubject<Product[]>(null);
  public readonly products$: Observable<Product[]> = muteFirst(
    this.getProducts().pipe(share(), startWith({})),
    this._products$.asObservable(),
  );

  private readonly _subscribeProductItems$ = new BehaviorSubject<SubscribeDialogData[]>([]);
  public readonly subscribeProductItems$ = this._subscribeProductItems$.asObservable();

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private localStorageService: BrowserStorageService,
  ) {
    this._subscribeProductItems$.next(this.getSubscribe());
    this.subscribeProductItems$.subscribe(value =>
      this.localStorageService.set(this.storeKey, JSON.stringify(value)),
    );
  }

  public subscribeToProduct(product: Product): void {
    const dialogRef = this.dialog.open(SubscribeDialogComponent, {
      width: '350px',
      data: {
        name: '',
        phone: '',
        product,
      },
    });

    dialogRef
      .afterClosed()
      .pipe(
        tap(result => this.log(`You signed up for ${result.product.name} successfully`)),
        tap(result =>
          this._subscribeProductItems$.next([...this._subscribeProductItems$.value, result]),
        ),
        tap(() =>
          this.openSnackBar('You have successfully subscribed to a product notification', 'Ok'),
        ),
      )
      .subscribe();
  }

  private getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl).pipe(
      tap(_ => this.log('fetched products')),
      tap(product => this._products$.next(product)),
      catchError(this.handleError<Product[]>('getProducts', [])),
    );
  }

  private getSubscribe(): SubscribeDialogData[] {
    try {
      return JSON.parse(this.localStorageService.get(this.storeKey)) || [];
    } catch (e) {
      return [];
    }
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

  private openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
