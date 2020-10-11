import { Injectable } from '@angular/core';
//Services
import { ToastrService } from 'ngx-toastr';
import { IProduct } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class AlertMessageService {
  constructor(private toast: ToastrService) {}

  showAlertAddProduct(product: IProduct) {
    this.toast.success(
      `${product.name} añadido al carrito.`,
      'Producto Agregado',
      {
        timeOut: 1500,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-top-right',
      }
    );
  }
  showAlertUpdateProduct(product: IProduct) {
    this.toast.info(
      `${product.name} Cantidad actualizada en el carrito.`,
      'Producto Actualizado',
      {
        timeOut: 1500,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-top-right',
      }
    );
  }
}
