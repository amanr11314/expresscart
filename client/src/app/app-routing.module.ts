import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsTableComponent } from './components/products-table/products-table.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';

import { LoginComponentComponent } from './components/login-component/login-component.component';
import { RegisterComponentComponent } from './components/register-component/register-component.component';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponentComponent
  },
  {
    path: 'register',
    component: RegisterComponentComponent
  },
  {
    path: 'home',
    component: ProductsTableComponent,
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
