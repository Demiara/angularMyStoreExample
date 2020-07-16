import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CartComponent } from './cart/cart.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { HttpClientModule } from '@angular/common/http';
import { InMemoryDataService } from './in-memory-data.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgModule } from '@angular/core';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { OrderFormComponent } from './order-form/order-form.component';
import { OrderListComponent } from './order-list/order-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductListComponent } from './product-list/product-list.component';
import { RouterModule } from '@angular/router';
import { SubscribeDialogComponent } from './subscribe-dialog/subscribe-dialog.component';
import { SubscriptionListComponent } from './subscription-list/subscription-list.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { ProductSearchComponent } from './product-search/product-search.component';


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
        SubscribeDialogComponent,
        SubscriptionListComponent,
        TopBarComponent,
        ProductSearchComponent,
    ],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        FlexLayoutModule,
        FormsModule,
        HttpClientModule,
        MatButtonModule,
        MatCardModule,
        MatDialogModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatSelectModule,
        MatSnackBarModule,
        MatTableModule,
        MatTabsModule,
        MatToolbarModule,
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
