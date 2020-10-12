import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

//Interfaces
import { IProduct } from '../interfaces/product';
import { IProductAndCategory } from '../interfaces/productAndCategory';
import { ICategory } from '../interfaces/category';


@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  URI = environment.URI;
  private allData$: BehaviorSubject<IProductAndCategory> = new BehaviorSubject<IProductAndCategory>(null);
  private productsData$: BehaviorSubject<IProduct[]> = new BehaviorSubject<IProduct[]>(null);
  private productData$: BehaviorSubject<IProduct> = new BehaviorSubject<IProduct>(null);
  //variable for filter category
  selectedCategory:string;
  //variable for filter type product
  selectedType:string;
  //variable for filter quantity product
  selectedQuantity:string;
  //variable for filter order product
  selectedOrder:string;
  constructor(private http: HttpClient) {
    this._getAllData();
  }
  getProducts() {
    return this.productsData$;
  }

  getProduct(id): Observable<IProduct> {
    return this.http
      .get<IProduct>(`${this.URI}/getProduct/${id}`)
      .pipe(map((product: IProduct) => product[0]));
  }

  _getProduct() {
    return this.productData$;
  }

  getAllData() {
    return this.allData$;
  }

  _getAllData(idProduct?: number) {

    return this.http.get<IProductAndCategory>(`${this.URI}/getAll`).subscribe(
      (data) => {
        console.log('Peticion Api');
        this.allData$.next(data);
        this.setProductData();
        if (idProduct) {
          this.filterProducts(data.products, 'id', idProduct);
        } 
      },
      (err) => console.log(err)
      );
  }
  setProductData() {
    this.productsData$.next(this.allData$.getValue().products);
  }

  filterProducts( ProductsData: IProduct[], attribut: string,textSearch: string | number) {
    // filter for name
    if (typeof textSearch === 'string') {
      let productsData = ProductsData.filter((product: IProduct) => {
        return product[attribut].includes(textSearch) === true ? true : false;
      });
      this.productsData$.next(productsData);
    } else {
      // filter for id\
      let productsData = ProductsData.filter((product: IProduct) => {
        return product[attribut] === textSearch;
      });
      this.productData$.next(productsData[0]);
      this.productsData$.next(ProductsData);
    }
  }
  filterFor(groupSelectOption:string, idSelectedOption:number){
    this.setProductData();
    let filterProductsData;
    const  productsData = this.productsData$.getValue();
    //filter products by order
    if (groupSelectOption ==='order' ){
      filterProductsData = this.filterForOrder(productsData, idSelectedOption)
    }else {
      // filter products by category, quantity and types
      filterProductsData = productsData.filter((product:IProduct)=>{
      switch (groupSelectOption) {
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
    this.productsData$.next(filterProductsData);
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
      //filter products by sort
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
    this.setProductData();
  }
  clearSelectedType(){
    this.selectedType = null;
    this.setProductData();
  }
  clearSelectedQuantity(){
    this.selectedQuantity = null;
    this.setProductData();
  }
  clearSelectedOrder(){
    this.selectedOrder = null;
    this.setProductData();
  }
}
