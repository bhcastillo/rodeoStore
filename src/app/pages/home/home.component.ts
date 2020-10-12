import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/interfaces/product';
import { IProductAndCategory } from 'src/app/interfaces/productAndCategory';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  implements OnInit{
  public products:IProduct[];
  productsData: IProductAndCategory;

  constructor(public productsService: ProductsService) {
    this.getProducts()
  }
  ngOnInit(): void {
    this.productsService.getAllData().subscribe(
      (data) => {
        this.productsData = data
      },
      (err) => console.log(err)
    )
  }
  getProducts(){
    this.productsService.getProducts().subscribe(
      (dataProducts)=>this.products =dataProducts),
      (err)=>console.log(err)
  }
}
