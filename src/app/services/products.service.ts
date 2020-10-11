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
  filterForCategory(idCategory:number){
    this.setProductData()
    const  productsData = this.productsData$.getValue()
    const filterProductsData = productsData.filter((product:IProduct)=>{
        for( const key of Object.keys(product.categories)){
          if (product.categories[key] === idCategory){
            return true;
          }
        }
        return false;
    });
    this.productsData$.next(filterProductsData);
  }
}
