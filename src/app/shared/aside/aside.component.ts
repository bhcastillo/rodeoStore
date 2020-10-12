import { Component, Input, OnInit } from '@angular/core';
import { IProductAndCategory } from 'src/app/interfaces/productAndCategory';
//Services
import { FiltersService } from 'src/app/services/filters.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent implements OnInit {
  
  @Input()categoriesData;
  productsData: IProductAndCategory;
  
  itemsType = [{ id:1,name:'Más Vendido'},{ id:2,name:'Disponibles'},{ id:3,name:'Agotados'}];
  itemsQuantity = [{id:1, name:'Más de $30.000'},{id:2, name:'Menos de $10.000'}];
  itemsOrder = [{id:1, name:'Nombre'},{id:2, name:'Mayor precio'},{id:3, name:'Menor precio'}];

  constructor(public filtersService:FiltersService,public productsService:ProductsService) { }

  ngOnInit(): void {
    this.productsService.getAllData().subscribe(
      (data) => {
        this.productsData = data
      },
      (err) => console.log(err)
    )
  }
  filterFor(groupSelectOption,id:number){
    let inputSearch:any  = document.getElementById('txtSearch');
    //clear value input Search products
    inputSearch.value = '';
    //filter products
    this.filtersService.filterFor(groupSelectOption,id);
  }
 
  clearSelectedCategory(){
    this.filtersService.clearSelectedCategory();
  }
  clearSelectedType(){
    this.filtersService.clearSelectedType();
  }
  clearSelectedQuantity(){
    this.filtersService.clearSelectedQuantity();
  }
  clearSelectedOrder(){
    this.filtersService.clearSelectedOrder();
  }
}
