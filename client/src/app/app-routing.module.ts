import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsTableComponent } from './components/products-table/products-table.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';

import { LoginComponentComponent } from './components/login-component/login-component.component';
import { RegisterComponentComponent } from './components/register-component/register-component.component';
import { AuthGuard } from './shared/auth.guard';
import { LoggedInGuard } from './shared/loggedin.gaurd';
import { CartComponent } from './components/cart/cart.component';
import { AllProductsComponent } from './components/all-products/all-products.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponentComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path: 'register',
    component: RegisterComponentComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path: 'home',
    component: ProductsTableComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'cart',
    component: CartComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'product/details/:id', component: ProductDetailsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'product/create', component: CreateProductComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'product/edit/:id', component: EditProductComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'lazy',
    loadChildren: () => import('./lazy.module').then(m => m.LazyModule)
  },
  {
    path: 'swagger',
    component: AllProductsComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
