import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from '../../interfaces/product';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() products:IProduct[] ;

  constructor() { }

  ngOnInit(): void {
    console.log(this.products);
  }

}
