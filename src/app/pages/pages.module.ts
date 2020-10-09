//Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../components/components.module';
//Services
import { ProductsService } from '../services/products.service';
//Components
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';

@NgModule({
  declarations: [
    HomeComponent,
    ProductComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule
  ],
  exports:[
    HomeComponent,
    ProductComponent,
  ],providers:[
    ProductsService
  ]
})
export class PagesModule { }
