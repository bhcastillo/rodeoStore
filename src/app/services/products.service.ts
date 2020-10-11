import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

//Interfaces
import { IProduct } from '../interfaces/product';
import { IProductAndCategory } from '../interfaces/productAndCategory';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  URI = environment.URI;
  constructor(private http:HttpClient) {
   }
  getProducts():Observable<IProduct[]>{
    return  this.http.get(`${this.URI}/getAll`)
              .pipe(map((res:any)=>res.products));
  }
  getProduct(id):Observable<IProduct>{
    return  this.http.get<IProduct>(`${this.URI}/getProduct/${id}`)
              .pipe(map((product:IProduct)=>product[0]));
  }
  getAll():Observable<IProductAndCategory>{
    return  this.http.get<IProductAndCategory>(`${this.URI}/getAll`)             
  }
  filterProductForName(ProductsData:IProductAndCategory, textSearch:string){
    let products = ProductsData.products.filter((product:IProduct)=>{
      return product.name.includes(textSearch)=== true ? true :false;
    })
    console.log('products',products);
  }
}
