import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { combineLatest, Observable } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CartService } from '../cart.service';
import { Unsubscribe } from '../utils/unsubscribe.mixin';
import { map, takeUntil, withLatestFrom } from 'rxjs/operators';
import { Shipping } from '../shipping';
import { Order } from '../order';

@Component({
    selector: 'app-order-form',
    templateUrl: './order-form.component.html',
    styleUrls: ['./order-form.component.css'],
})
export class OrderFormComponent extends Unsubscribe(Object) implements OnInit, OnDestroy {
    public shippingCosts$: Observable<Shipping[]>;
    public totalPrice$: Observable<number>;

    public orderForm = new FormGroup({
        userName: new FormControl('', Validators.required),
        userPhone: new FormControl('', Validators.required),
        shipping: new FormControl('', Validators.required),
        userAddress: new FormControl(''),
        orderPrice: new FormControl('', Validators.required),
        orderProducts: new FormControl({ value: [] }, Validators.required),
        canceled: new FormControl(false),
    });

    constructor(private orderService: OrderService, private cartService: CartService) {
        super();
    }

    public ngOnInit(): void {
        this.shippingCosts$ = this.orderService.getShippingPrices();
        this.getOrderPrice();
        this.setTotalPrice();
        this.getCartProducts();
    }

    public ngOnDestroy() {
        super.ngOnDestroy();
    }

    public onSubmit() {
        const totalOrder: Order = this.orderForm.value;
        this.orderService
            .addOrder(totalOrder)
            .subscribe(order => this.orderService.gotoOrder(order));
        this.cartService.clearCart();
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

    private getCartProducts() {
        this.cartService.cartItems$.pipe(takeUntil(this.unsubscribe$)).subscribe(cartItems =>
            this.orderForm.patchValue({
                orderProducts: cartItems,
            }),
        );
    }
}
