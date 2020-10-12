import { Injectable } from '@angular/core';
import { IFilter } from '../interfaces/filter';
import { IProduct } from '../interfaces/product';
import { ProductsService } from './products.service';

@Injectable({
  providedIn: 'root'
})
export class FiltersService {
  //variable for filter category
  selectedCategory:string;
  //variable for filter type product
  selectedType:string;
  //variable for filter quantity product
  selectedQuantity:string;
  //variable for filter order product
  selectedOrder:string;
  //array  active filters
  activeFilters:IFilter[]=[];
  constructor(private productsService:ProductsService) { }
  
  filterFor(filter:string, id:number){
    let indexFilter = this.activeFilters.findIndex((itemfilter)=>itemfilter.name === filter);
    //clear duplicate filter
    if ( indexFilter !== -1 || !id ){
      this.activeFilters.splice(indexFilter,1);
    }
    //add new filter
    if (id){
      this.activeFilters.push({name:filter,id});
    }
    //get all products
    this.productsService.setProductData();
    //filter products
    this.activeFilters.forEach((filter:IFilter) => {
      this.executeFilter(filter.name,filter.id )
    });
  }

  private executeFilter(filter,idSelectedOption){
    const  productsData = this.productsService.productsData$.getValue();
    let filterProductsData;
    //filter products by order
    if (filter ==='order' ){
      filterProductsData = this.filterForOrder(productsData, idSelectedOption)
    }
    // filter products by category, quantity and types
    else {
      filterProductsData = productsData.filter((product:IProduct)=>{
        switch (filter) {
          //filter products by category
          case 'categories':
            return this.filterForCategory(product,idSelectedOption);
          //filter products by quantity
          case 'quantities':
            return this.filterForQuantity(product, idSelectedOption);
          //filter products by types
          case 'types':
            return this.filterForType(product, idSelectedOption);
        }
      });
    }
    this.productsService.productsData$.next(filterProductsData);
  }

  private filterForCategory(product:IProduct, idSelectedOption:number){
    for( const key of Object.keys(product.categories)){
          if (product.categories[key] === idSelectedOption){
            return true;
          }
        }
        return false;
  }

  private filterForType(product:IProduct, idSelectedOption:number){
     switch (idSelectedOption) {
          //filter products by bestseller
          case 1:
            if (product.bestSeller) return true;
            break;
          //filter porducts by available
          case 2:
            if (product.quantity>0)return true;
            break;
          //filter products by Exhausted 
          case 3:
            if (product.quantity<1)return true;
          default:
            return false;
    }
  }

  private filterForQuantity(product:IProduct, idSelectedOption:number){
    switch (idSelectedOption) {
      //filter products by greater than $30.000
      case 1:
        if (product.price >30000)return true;
        break;
        //filter products by less  than $10.000
      case 2:
        if (product.price <10000)return true;
        break;
      default:
        return false;
    }
  }

  private filterForOrder(productsData, idSelectedOption:number){
    switch (idSelectedOption) {
      //filter products by name
      case 1:
        return productsData.sort(function(a,b){
          if (a.name > b.name) return 1;
          if (a.name < b.name) return -1;
          return 0;
        });
      //filter products from largest to smallest
      case 2:
        return productsData.sort(function(b,a){
          if (a.price > b.price) return 1;
          if (a.price < b.price) return -1;
          return 0;
        })
      //filter products from smaillest to largest 
      case 3:
        return productsData.sort(function(a,b){
          if (a.price > b.price) return 1;
          if (a.price < b.price) return -1;
          return 0;
        })
      // no filter
      default:
        productsData.sort(function(a,b){
          if (a.id > b.id) return 1;
          if (a.id < b.id) return -1;
          return 0;
        })
    }
  }
  clearSelectedCategory(){
    this.selectedCategory = null;
  }
  clearSelectedType(){
    this.selectedType = null;
  }
  clearSelectedQuantity(){
    this.selectedQuantity = null;
  }
  clearSelectedOrder(){
    this.selectedOrder = null;
  }
}
