import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { combineLatest, Observable } from 'rxjs';
import { map, takeUntil, withLatestFrom } from 'rxjs/operators';
import { Unsubscribe } from '../../mixin/unsubscribe.mixin';
import { Order } from '../../model/order';
import { Shipping } from '../../model/shipping';
import { CartService } from '../../service/cart.service';
import { OrderService } from '../../service/order.service';

@Component({
    selector: 'app-order-form',
    templateUrl: './order-form.component.html',
    styleUrls: ['./order-form.component.css'],
})
export class OrderFormComponent extends Unsubscribe(Object) implements OnInit, OnDestroy {
    public orderForm = new FormGroup({
        userName: new FormControl('', Validators.required),
        userPhone: new FormControl('', Validators.required),
        shipping: new FormControl('', Validators.required),
        userAddress: new FormControl(''),
        orderPrice: new FormControl('', Validators.required),
        orderProducts: new FormControl({ value: [] }, Validators.required),
        canceled: new FormControl(false),
    });
    public shippingCosts$: Observable<Shipping[]>;
    public totalPrice$: Observable<number>;

    constructor(private cartService: CartService, private orderService: OrderService) {
        super();
    }

    public ngOnInit(): void {
        this.shippingCosts$ = this.orderService.getShippingPrices();
        this.getOrderPrice();
        this.setTotalPrice();
        this.getCartProducts();
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    private getOrderPrice(): void {
        this.cartService.orderPrice$.pipe(takeUntil(this.unsubscribe$)).subscribe(total =>
            this.orderForm.patchValue({
                orderPrice: total,
            }),
        );
    }

    private setTotalPrice(): void {
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

    private getCartProducts(): void {
        this.cartService.cartItems$.pipe(takeUntil(this.unsubscribe$)).subscribe(cartItems =>
            this.orderForm.patchValue({
                orderProducts: cartItems,
            }),
        );
    }

    public getRequiredErrorMessage(): string {
        return 'You must enter a value';
    }

    public onSubmit(): void {
        const totalOrder: Order = this.orderForm.value;
        this.orderService
            .addOrder(totalOrder)
            .subscribe(order => this.orderService.gotoOrder(order));
        this.cartService.clearCart();
    }
}
