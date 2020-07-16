import { CartComponent } from './cart/cart.component';
import { NgModule } from '@angular/core';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { OrderListComponent } from './order-list/order-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductListComponent } from './product-list/product-list.component';
import { Routes, RouterModule } from '@angular/router';
import { SubscriptionListComponent } from './subscription-list/subscription-list.component';

const routes: Routes = [
    { path: '', component: ProductListComponent },
    { path: 'products/:id', component: ProductDetailComponent },
    { path: 'orders', component: OrderListComponent },
    { path: 'orders/:id', component: OrderDetailComponent },
    { path: 'subscriptions', component: SubscriptionListComponent },
    { path: 'cart', component: CartComponent },
    { path: '**', component: PageNotFoundComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
