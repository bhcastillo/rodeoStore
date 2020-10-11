import { Component, Input, OnInit } from '@angular/core';
//Services
import { ProductsService } from 'src/app/services/products.service';
import { IProduct } from 'src/app/interfaces/product';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Input()productsData;  
  constructor(private productsService:ProductsService) { }

  ngOnInit(): void {
  }
  SearchProduct(textSearch:string){
    textSearch = textSearch.trim()
    if (textSearch.length ===0)return;   
    this.productsService.filterProductForName(this.productsData, textSearch);
  }
}