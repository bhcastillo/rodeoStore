import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IProduct } from '../../interfaces/product';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input() products: IProduct[];

  constructor(private router: Router) {}

  ngOnInit(): void {
    console.log(this.products);
  }
  selectProduct(id: Number) {
    this.router.navigate(['/product', id]).then();
  }
}
