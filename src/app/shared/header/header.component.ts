import { Component, OnInit } from '@angular/core';
//Services
import { CartService } from 'src/app/services/cart.service';
//InterFaces
import { IcartDataServer } from 'src/app/interfaces/cartData';
import { IProductAndCategory } from 'src/app/interfaces/productAndCategory';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  cartData: IcartDataServer;
  constructor(private cartService: CartService) {

  }

  ngOnInit(): void {
    this.cartService.cartDataObs$.subscribe(
      (data) => this.cartData = data,
      (err) => console.log(err));
  }
}
