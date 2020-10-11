import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/interfaces/product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  {
  public products:IProduct[];
  constructor(public productsService: ProductsService) {
    this.getProducts()
  }
  getProducts(){
    this.productsService.getProducts().subscribe(
      (dataProducts)=>this.products =dataProducts),
      (err)=>console.log(err)
  }
}
