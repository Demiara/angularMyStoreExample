import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CartComponent } from './components/cart/cart.component';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { OrderFormComponent } from './components/order-form/order-form.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductSearchComponent } from './components/product-search/product-search.component';
import { SubscribeDialogComponent } from './components/subscribe-dialog/subscribe-dialog.component';
import { SubscriptionListComponent } from './components/subscription-list/subscription-list.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { MaterialModule } from './material/material.module';
import { InMemoryDataService } from './service/in-memory-data.service';

@NgModule({
    declarations: [
        AppComponent,
        CartComponent,
        OrderDetailComponent,
        OrderFormComponent,
        OrderListComponent,
        PageNotFoundComponent,
        ProductDetailComponent,
        ProductListComponent,
        ProductSearchComponent,
        SubscribeDialogComponent,
        SubscriptionListComponent,
        TopBarComponent,
    ],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        FlexLayoutModule,
        FormsModule,
        HttpClientModule,
        MaterialModule,
        ReactiveFormsModule,
        RouterModule,
        HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
            dataEncapsulation: false,
            passThruUnknownUrl: true,
            put204: false,
        }),
        AppRoutingModule,
    ],
    providers: [],
    entryComponents: [SubscribeDialogComponent],
    bootstrap: [AppComponent],
})
export class AppModule {}
