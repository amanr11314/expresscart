import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsTableComponent } from './components/products-table/products-table.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';

const routes: Routes = [
  {
    path: '',
    component: ProductsTableComponent
  },
  { path: 'product/details/:id', component: ProductDetailsComponent },
  { path: 'product/create', component: CreateProductComponent },
  { path: 'product/edit/:id', component: EditProductComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
