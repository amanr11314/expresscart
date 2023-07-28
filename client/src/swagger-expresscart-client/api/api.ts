export * from './cart.service';
import { CartService } from './cart.service';
export * from './product.service';
import { ProductService } from './product.service';
export const APIS = [CartService, ProductService];
