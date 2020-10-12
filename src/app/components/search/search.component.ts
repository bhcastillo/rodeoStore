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
  @Input()categoriesData;
  itemsType = [{ id:1,name:'Más Vendido'},{ id:2,name:'Disponibles'},{ id:3,name:'Agotados'}];
  itemsQuantity = [{id:1, name:'Más de $30.000'},{id:2, name:'Menos de $10.000'}]
  constructor(public productsService:ProductsService) { }
  
  ngOnInit(): void {
  }
  SearchProductForName(textSearch:string){
    textSearch = textSearch.trim()
    if (textSearch.length ===0)return;
    //filter for product name   
    this.productsService.filterProducts(this.productsData,'name', textSearch);
  }
  filterFor(groupSelectOption,id:number){
    this.productsService.filterFor(groupSelectOption,id);
  }
 
  clearSelectedCategory(){
    this.productsService.clearSelectedCategory();
  }
  clearSelectedType(){
    this.productsService.clearSelectedType();
  }
  clearSelectedQuantity(){
    this.productsService.clearSelectedQuantity();
  }

}
