import { Component, OnInit } from '@angular/core';
//Services
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';
//InterFaces
import { IcartDataServer } from 'src/app/interfaces/cartData';
import { IProduct } from 'src/app/interfaces/product';
import { IProductAndCategory } from 'src/app/interfaces/productAndCategory';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  cartData: IcartDataServer;
  productsData: IProductAndCategory;
  constructor(private cartService: CartService, public productsService: ProductsService) {

  }

  ngOnInit(): void {
    this.cartService.cartDataObs$.subscribe(
      (data) => this.cartData = data,
      (err) => console.log(err));
    this.productsService.getAllData().subscribe(
      (data) => this.productsData = data,
      (err) => console.log(err)
    )
  }


}
