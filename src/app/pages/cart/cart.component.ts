import { Component, OnInit } from '@angular/core';
import { IcartDataServer } from 'src/app/interfaces/cartData';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit {

  cartData:any=[];
  cartTotal:number;
  subtotal:number
  constructor(public cartService:CartService) { 

      this.cartService.cartDataObs$.subscribe(data=>{
        this.cartData =data.data;
      })
           this.cartService.cartTotal$.subscribe(total => this.cartTotal = total);


  }

  ngOnInit(): void {

  }
  ChangeQuantity(id: Number, increaseQuantity: Boolean) {
    this.cartService.UpdateCartData(id, increaseQuantity);
  }
}
