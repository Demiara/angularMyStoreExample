import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { SubscriptionListComponent } from './components/subscription-list/subscription-list.component';

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
