export * from './auth.service';
import { AuthService } from './auth.service';
export * from './cart.service';
import { CartService } from './cart.service';
export * from './product.service';
import { ProductService } from './product.service';
export const APIS = [AuthService, CartService, ProductService];
