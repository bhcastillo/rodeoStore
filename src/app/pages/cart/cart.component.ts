import { Component } from '@angular/core';
//Services
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent  {

  cartData:any=[];
  cartTotal:number;
  subtotal:number
  constructor(public cartService:CartService) {
    this.cartService.cartDataObs$.subscribe(data=>{
      this.cartData =data.data;
    });
    this.cartService.cartTotal$.subscribe(total => this.cartTotal = total);
  }

  ChangeQuantity(id: Number, increaseQuantity: Boolean) {
    this.cartService.UpdateCartData(id, increaseQuantity);
  }
}
