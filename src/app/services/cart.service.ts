import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
//Services
import { ProductsService } from './products.service';
//Interfaces
import { ICardDataClient, IcartDataServer } from '../interfaces/cartData';
import { IProduct } from '../interfaces/product';
import { AlertMessageService } from './alert-message.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartDataClient: ICardDataClient = {
    prodData: [{ quantityInCart: 0, id: 0 }],
    total: 0,
  };
  public cartDataServer: IcartDataServer = {
    data: [
      {
        quantityInCart: 0,
        product: undefined,
      },
    ],
    total: 0,
  };
  cartDataObs$ = new BehaviorSubject<IcartDataServer>(this.cartDataServer);
  cartTotal$ = new BehaviorSubject<number>(0);
  constructor(private productsService: ProductsService,private alertMessageService: AlertMessageService) {
    this.cartTotal$.next(this.cartDataServer.total);
    this.cartDataObs$.next(this.cartDataServer);

    let info: ICardDataClient = JSON.parse(localStorage.getItem('cart'));
    if (
      info !== null &&
      info !== undefined &&
      info.prodData[0].quantityInCart !== 0
    ) {
      // assign the value to our data variable which corresponds to the LocalStorage data format
      this.cartDataClient = info;
      // Loop through each entry and put it in the cartDataServer object
     
      this.cartDataClient.prodData.forEach((p) => {
        this.productsService
          .getProduct(p.id)
          .subscribe((ProdInfoDB: IProduct) => {
            if (this.cartDataServer.data[0].quantityInCart === 0) {
              this.cartDataServer.data[0].quantityInCart = p.quantityInCart;
              this.cartDataServer.data[0].product = ProdInfoDB;
              this.calculateTotal();
              this.cartDataClient.total = this.cartDataServer.total;
              localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
            } else {
              this.cartDataServer.data.push({
                quantityInCart: p.quantityInCart,
                product: ProdInfoDB,
              });
              this.calculateTotal();
              this.cartDataClient.total = this.cartDataServer.total;
              localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
            }
            this.cartDataObs$.next({ ...this.cartDataServer });
          });
      });
    }
  }

  AddProductToCart(id: Number, quantity?: number) {
    this.productsService
      .getProduct(id)
      .subscribe((product) => this.saveProductInCart(product, quantity));
  }
  
  saveProductInCart(product: IProduct, quantity?: number) {
    product.quantity = Number(product.quantity);
    quantity = Number(quantity);
    // If the cart is empty
    if (this.cartDataServer.data[0].product === undefined) {
      this.cartDataServer.data[0].product = product;
      this.cartDataServer.data[0].quantityInCart =
        quantity !== undefined ? quantity : 1;
      this.calculateTotal();
      this.cartDataClient.prodData[0].id = product.id;
      this.cartDataClient.prodData[0].quantityInCart = this.cartDataServer.data[0].quantityInCart;
      this.cartDataClient.total = this.cartDataServer.total;
      localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
      this.cartDataObs$.next({ ...this.cartDataServer });
      this.alertMessageService.showAlertAddProduct(product);  
    }
    // Cart is not empty
    else {
      let index = this.cartDataServer.data.findIndex((p) => p.product.id === product.id);
      //1. If chosen product is already in cart array
      if (index !== -1) {
      if (quantity <= product.quantity){
      }
        if (quantity !== undefined && quantity <= product.quantity) {
          this.cartDataServer.data[index].quantityInCart =
            this.cartDataServer.data[index].quantityInCart <= product.quantity ? quantity : product.quantity;
        } else {
          this.cartDataServer.data[index].quantityInCart < product.quantity ? this.cartDataServer.data[index].quantityInCart++: product.quantity;
        }
        this.cartDataClient.prodData[index].quantityInCart = this.cartDataServer.data[index].quantityInCart;
        this.alertMessageService.showAlertUpdateProduct(product);
      }
      // 2. If chosen product is not in cart array
      else {
        this.cartDataServer.data.push({product,quantityInCart:  1,});
        this.cartDataClient.prodData.push({id: product.id,quantityInCart:  1,});
        this.alertMessageService.showAlertAddProduct(product);

      }
      this.calculateTotal();
      this.cartDataClient.total = this.cartDataServer.total;
      localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
      this.cartDataObs$.next({ ...this.cartDataServer });
    }
  }
  UpdateCartData(index, increase: Boolean) {
    let data = this.cartDataServer.data[index];
    if (increase) {
      
      data.quantityInCart < data.product.quantity ? data.quantityInCart++ : data.product.quantity;
      this.cartDataClient.prodData[index].quantityInCart = data.quantityInCart;
      this.calculateTotal();
      this.cartDataClient.total = this.cartDataServer.total;
      this.cartDataObs$.next({...this.cartDataServer});
      localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
    } else {
      
      data.quantityInCart--;
      
      if (data.quantityInCart < 1) {
        this.DeleteProductFromCart(index);
        this.cartDataObs$.next({...this.cartDataServer});
      } else {
        
        this.cartDataObs$.next({...this.cartDataServer});
        this.cartDataClient.prodData[index].quantityInCart = data.quantityInCart;
        this.calculateTotal();
        this.cartDataClient.total = this.cartDataServer.total;
        localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
      }
    }
  }
  DeleteProductFromCart(index) {
    if (window.confirm('Seguro que quieres eliminar el producto?')) {
      this.cartDataServer.data.splice(index, 1);
      this.cartDataClient.prodData.splice(index, 1);
      this.calculateTotal();
      this.cartDataClient.total = this.cartDataServer.total;

      if (this.cartDataClient.total === 0) {
        this.cartDataClient = {prodData: [{quantityInCart: 0, id: 0}], total: 0};
        localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
      } else {
        localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
      }

      if (this.cartDataServer.total === 0) {
        this.cartDataServer = {
          data: [{
            product: undefined,
            quantityInCart: 0
          }],
          total: 0
        };
        this.cartDataObs$.next({...this.cartDataServer});
      } else {
        this.cartDataObs$.next({...this.cartDataServer});
      }
    }
    // If the user doesn't want to delete the product, hits the CANCEL button
    else {
      return;
    }
  }
  CalculateSubTotal(index): Number {
    let subTotal = 0;

    let product = this.cartDataServer.data[index];
    // @ts-ignore
    subTotal = product.product.price * product.quantityInCart;
    
    return subTotal;
  }
  calculateTotal() {
    let total = 0;
    this.cartDataServer.data.forEach((products) => {
      const { price } = products.product;
      const { quantityInCart } = products;
      total += price * quantityInCart;
    });
    this.cartDataServer.total = total;
    this.cartTotal$.next(this.cartDataServer.total);
  }
}
