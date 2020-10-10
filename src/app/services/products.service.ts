import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IProduct } from '../interfaces/product';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

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
}
