import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { combineLatest, Observable } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CartService } from '../cart.service';
import { Unsubscribe } from '../utils/unsubscribe.mixin';
import { debounceTime, map, takeUntil, withLatestFrom } from 'rxjs/operators';
import { Shipping } from '../shipping';

@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.css'],
})
export class OrderComponent extends Unsubscribe(Object) implements OnInit, OnDestroy {
    public shippingCosts$: Observable<Shipping[]>;
    public totalPrice$: Observable<number>;

    public orderForm = new FormGroup({
        userName: new FormControl('', Validators.required),
        userPhone: new FormControl('', Validators.required),
        shipping: new FormControl('', Validators.required),
        userAddress: new FormControl(''),
        orderPrice: new FormControl('', Validators.required),
        productsId: new FormControl({ value: [] }, Validators.required),
    });

    constructor(private orderService: OrderService, private cartService: CartService) {
        super();
    }

    public ngOnInit(): void {
        this.shippingCosts$ = this.orderService.getShippingPrices();
        this.getOrderPrice();
        this.setTotalPrice();
    }

    public ngOnDestroy() {
        super.ngOnDestroy();
    }

    public onSubmit() {
        // TODO: Use EventEmitter with form value
        console.warn(this.orderForm.value);
    }

    public getRequiredErrorMessage() {
        return 'You must enter a value';
    }

    private getOrderPrice() {
        this.cartService.orderPrice$.pipe(takeUntil(this.unsubscribe$)).subscribe(total =>
            this.orderForm.patchValue({
                orderPrice: total,
            }),
        );
    }

    private setTotalPrice() {
        this.totalPrice$ = combineLatest([
            this.cartService.orderPrice$,
            this.orderForm.get('shipping').valueChanges,
        ]).pipe(
            withLatestFrom(this.shippingCosts$),
            map(
                ([[orderPrice, shippingId], shippings]) =>
                    orderPrice + this.getShippingPrice(parseInt(shippingId, 10), shippings),
            ),
        );
    }

    private getShippingPrice(shippingId: number, shippings: Shipping[]): number {
        const shippingItem = shippings.find(shipping => shipping.id === shippingId);
        return shippingItem.price;
    }

}
