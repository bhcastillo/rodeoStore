import { IProduct } from './product';
import { ICategory } from './category';

export interface IProductAndCategory {
  categories:ICategory[];
  products:IProduct[];
}