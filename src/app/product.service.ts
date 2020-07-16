import { BehaviorSubject, Observable } from 'rxjs';
import { BrowserStorageService } from './storage.service';
import { catchError, map, shareReplay, startWith, tap } from 'rxjs/operators';
import { handleError, muteFirst } from './utils/api-util';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MessageService } from './message.service';
import { Product } from './product';
import { Router } from '@angular/router';
import { SubscribeDialogComponent } from './subscribe-dialog/subscribe-dialog.component';
import { SubscribeDialogData } from './subscribe-dialog-data';

@Injectable({
    providedIn: 'root',
})
export class ProductService {
    private readonly httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    private readonly logSource = 'ProductService';
    private readonly productsUrl = 'api/products';

    private readonly _products$ = new BehaviorSubject<Product[]>(null);
    public readonly products$: Observable<Product[]> = muteFirst(
        this.getProducts().pipe(shareReplay(1), startWith({})),
        this._products$.asObservable(),
    );

    private readonly storeKey = 'productSubscribe';

    private readonly _subscribeProductItems$ = new BehaviorSubject<SubscribeDialogData[]>([]);
    public readonly subscribeProductItems$ = this._subscribeProductItems$.asObservable();

    constructor(
        private http: HttpClient,
        private localStorageService: BrowserStorageService,
        private messageService: MessageService,
        private router: Router,
        public dialog: MatDialog,
    ) {
        this._subscribeProductItems$.next(this.getSubscribe());
        this.subscribeProductItems$.subscribe(value =>
            this.localStorageService.set(this.storeKey, JSON.stringify(value)),
        );
    }

    private getSubscribe(): SubscribeDialogData[] {
        try {
            return JSON.parse(this.localStorageService.get(this.storeKey)) || [];
        } catch (e) {
            return [];
        }
    }

    public getProduct(id: number | string): Observable<Product> {
        return this.getProducts().pipe(
            map((products: Product[]) => products.find(product => product.id === +id)),
        );
    }

    private getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(this.productsUrl).pipe(
            tap(() => this.messageService.log(this.logSource, 'fetched products')),
            tap(product => this._products$.next(product)),
            catchError(handleError<Product[]>('getProducts', [])),
        );
    }

    public gotoProducts(): void {
        this.router.navigate(['/']);
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
                tap(result => {
                    this._subscribeProductItems$.next([
                        ...this._subscribeProductItems$.value,
                        result,
                    ]);
                }),
                tap(result => {
                    this.messageService.log(
                        this.logSource,
                        `You subscribed for ${result.product.name} successfully`,
                    );
                    this.messageService.openSnackBar(
                        'You have successfully subscribed to a product notification',
                        'Ok',
                        2000,
                    );
                }),
            )
            .subscribe();
    }

    public unsubscribeItem(index: number, subscribe: SubscribeDialogData): void {
        const subscribesClone = this._subscribeProductItems$.value.slice();
        subscribesClone.splice(index, 1);
        this._subscribeProductItems$.next(subscribesClone);
        this.messageService.openSnackBar(
            'You have successfully unsubscribed from the product',
            'Ok',
            2000,
        );
        this.messageService.log(
            this.logSource,
            `You have successfully unsubscribed from the product: ${subscribe.product.name}`,
        );
    }

    public updateProduct(product: Product): Observable<any> {
        return this.http.put(this.productsUrl, product, this.httpOptions).pipe(
            tap(() => {
                this.messageService.log(this.logSource, `updated product id=${product.id}`);
                this.messageService.openSnackBar(
                    'Your product has been successfully updated',
                    'Ok',
                    2000,
                );
            }),
            catchError(handleError<any>('updateProduct')),
        );
    }
}
