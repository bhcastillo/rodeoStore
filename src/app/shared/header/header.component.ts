import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IcartDataServer } from 'src/app/interfaces/cartData';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  cartData:IcartDataServer;

  constructor(private cartService:CartService) {

   }

  ngOnInit(): void {
    this.cartService.cartDataObs$.subscribe(data=> this.cartData = data);
  }
  SearchProduct(textSearch:string){
    textSearch = textSearch.trim()
    if (textSearch.length ===0)return;
    
  }
 
}
