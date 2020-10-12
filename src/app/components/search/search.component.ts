import { Component, Input, OnInit } from '@angular/core';
//Services
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Input()productsData;
  
  
  constructor(public productsService:ProductsService) { }
  
  ngOnInit(): void {
  }
  SearchProductForName(textSearch:string){
    textSearch = textSearch.trim()
    if (textSearch.length ===0)return;
    //filter for product name   
    this.productsService.filterProducts(this.productsData,'name', textSearch);
  }
  

}
