import { IProduct } from './product';

export interface IcartDataServer {
  data: [{ product: IProduct; quantityInCart: number }];
  total: number;
}
export interface ICardDataClient {
  prodData: [{ quantityInCart: number; id: number }];
  total: number;
}
