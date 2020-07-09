import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CartService } from '../cart.service';
import { Unsubscribe } from '../utils/unsubscribe.mixin';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.css'],
})
export class OrderComponent extends Unsubscribe(Object) implements OnInit, OnDestroy {
    public shippingCosts: Observable<any>;
    public orderForm = new FormGroup({
        userName: new FormControl('', Validators.required),
        userPhone: new FormControl('', Validators.required),
        shippingRate: new FormControl('', Validators.required),
        userAddress: new FormControl(''),
        orderPrice: new FormControl({ value: '', disabled: true }, Validators.required),
    });

    constructor(private orderService: OrderService, private cartService: CartService) {
        super();
    }

    public ngOnInit(): void {
        this.shippingCosts = this.orderService.getShippingPrices();
        this.getTotalPrice();
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

    public getTotalPrice() {
        this.cartService.totalPrice$.pipe(takeUntil(this.unsubscribe$)).subscribe(total =>
            this.orderForm.patchValue({
                orderPrice: total,
            }),
        );
    }
}
