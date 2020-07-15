import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { TopBarComponent } from './top-bar/top-bar.component';
import { ProductListComponent } from './product-list/product-list.component';
import { SubscribeDialogComponent } from './subscribe-dialog/subscribe-dialog.component';
import { CartComponent } from './cart/cart.component';
import { AppRoutingModule } from './app-routing.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { OrderFormComponent } from './order-form/order-form.component';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { SubscriptionListComponent } from './subscription-list/subscription-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';


@NgModule({
    declarations: [
        AppComponent,
        TopBarComponent,
        ProductListComponent,
        SubscribeDialogComponent,
        CartComponent,
        PageNotFoundComponent,
        OrderFormComponent,
        OrderListComponent,
        OrderDetailComponent,
        SubscriptionListComponent,
        ProductDetailComponent,
    ],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        FlexLayoutModule,
        HttpClientModule,
        MatButtonModule,
        MatDialogModule,
        MatSnackBarModule,
        MatTableModule,
        MatToolbarModule,
        MatInputModule,
        MatSelectModule,
        MatCardModule,
        MatTabsModule,
        MatExpansionModule,
        MatListModule,
        MatIconModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule,
        // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
        // and returns simulated server responses.
        // Remove it when a real server is ready to receive requests.
        HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
            dataEncapsulation: false,
            passThruUnknownUrl: true,
            put204: false, // return entity after PUT/update
        }),
        AppRoutingModule,
    ],
    providers: [],
    entryComponents: [SubscribeDialogComponent],
    bootstrap: [AppComponent],
})
export class AppModule {}
