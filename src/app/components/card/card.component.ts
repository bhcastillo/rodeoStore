import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { IProduct } from '../../interfaces/product';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input() products: IProduct[];

  constructor(private router: Router,private cartService:CartService) {}

  ngOnInit(): void {
  }
  selectProduct(id: Number) {
    this.router.navigate(['/product', id]).then();
  }
  AddProduct(id: Number) {
    this.cartService.AddProductToCart(id);
  }
}
