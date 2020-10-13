//Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { ComponentsModule } from '../components/components.module';
//Services
import { ProductsService } from '../services/products.service';
//Components
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { MaterialModule } from '../material.module';
import { AppRoutingModule } from '../app-routing.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { CheckoutComponent } from './checkout/checkout.component';


@NgModule({
  declarations: [
    HomeComponent,
    ProductComponent,
    CartComponent,
    CheckoutComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    SharedModule,    
    ComponentsModule,
    MaterialModule,
  ],
  exports:[
    HomeComponent,
    ProductComponent,
  ],providers:[
    ProductsService
  ]
})
export class PagesModule { }
