import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IProduct } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  URI = environment.URI;
  constructor(private http:HttpClient) {
   }
  getAll(){
    return  this.http.get(`${this.URI}/getAll`)
  }

}
