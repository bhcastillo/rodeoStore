import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//Components
import { HomeComponent } from './pages/home/home.component';
import { ProductComponent } from './pages/product/product.component';
import { CartComponent } from './pages/cart/cart.component';

const routes: Routes = [
 {
   path: '', component: HomeComponent
 },
  {
   path: 'home', component: HomeComponent
 },
 {
   path: 'product/:id', component: ProductComponent
 },
 {
   path: 'cart', component: CartComponent
 }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
