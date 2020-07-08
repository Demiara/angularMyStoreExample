import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
    public shippingCosts: Observable<any>;
    public orderForm = new FormGroup({
        userName: new FormControl('', Validators.required),
        userPhone: new FormControl('', Validators.required),
        shippingRate: new FormControl('', Validators.required),
        userAddress: new FormControl(''),
    });

    constructor(private orderService: OrderService) {}

    ngOnInit(): void {
        this.shippingCosts = this.orderService.getShippingPrices();
    }
    public onSubmit() {
        // TODO: Use EventEmitter with form value
        console.warn(this.orderForm.value);
    }
    public getRequiredErrorMessage() {
        return 'You must enter a value';
    }
}
