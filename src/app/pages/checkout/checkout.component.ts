import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {

  cartData:any=[];
  cartTotal:number;
  subtotal:number
  constructor(public cartService:CartService) {
    this.cartService.cartDataObs$.subscribe(data=>{
      this.cartData =data.data;
    });
  this.cartService.cartTotal$.subscribe(total => this.cartTotal = total);
  }

}
