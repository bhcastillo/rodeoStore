import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/interfaces/product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public products:IProduct[]= [];
  constructor(public productsService: ProductsService) { }

  ngOnInit() {
    this.productsService.getAll().subscribe(
      (res:any)=> this.products = res.products,
      (err)=> console.log(err)
      )
  }

}