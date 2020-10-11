import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from 'src/app/interfaces/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  public product: IProduct;
  @ViewChild('quantity') quantityInput;
  constructor(
    private activateRoute: ActivatedRoute,
    private router: Router,
    private productsService: ProductsService,
    private cartService:CartService
  ) {
  }
  
  ngOnInit(): void {
    let { id } = this.activateRoute.snapshot.params;
    this.getProduct(Number(id) )
  }

   getProduct(id:number){
    //if 'id' exists function _getAllData () will seek product for id
    this.productsService._getAllData(id);
    // get product of productService
    this.productsService._getProduct().subscribe(
      (dataProducts)=>{
        if (dataProducts){
          this.product = dataProducts;
        }
      }),
      (err)=>{
        console.log(err);
        this.router.navigateByUrl('/')
      }
  }

  addToCart(id: Number) {
    this.cartService.AddProductToCart(id, this.quantityInput.nativeElement.value);
  }
  Increase() {
    let value = parseInt(this.quantityInput.nativeElement.value);
    if (this.product.quantity >= 1){
      value++;

      if (value > this.product.quantity) {
        // @ts-ignore
        value = this.product.quantity;
      }
    } else {
      return;
    }

    this.quantityInput.nativeElement.value = value.toString();
  }
  Decrease() {
    let value = parseInt(this.quantityInput.nativeElement.value);
    if (this.product.quantity > 0){
      value--;

      if (value <= 0) {
        // @ts-ignore
        value = 0;
      }
    } else {
      return;
    }
    this.quantityInput.nativeElement.value = value.toString();
  }
}
