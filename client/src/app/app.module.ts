import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AuthInterceptor } from './services/auth/authconfig.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ButtonComponent } from './components/button/button.component';
import { ProductsTableComponent } from './components/products-table/products-table.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';
import { LoginComponentComponent } from './components/login-component/login-component.component';
import { CustomLabelInputComponent } from './components/custom-label-input/custom-label-input.component';
import { RegisterComponentComponent } from './components/register-component/register-component.component';
import { MultiSelectDropdownComponent } from './components/multi-select-dropdown/multi-select-dropdown.component';
import { PreviewModalComponent } from './components/preview-modal/preview-modal.component';
import { CartComponent } from './components/cart/cart.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AddCartComponent } from './components/add-cart/add-cart.component';
import { AllProductsComponent } from './components/all-products/all-products.component';
import { Configuration } from 'swagger-expresscart-client';
import { AuthService } from './services/auth/auth.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ButtonComponent,

    ProductsTableComponent,
    ProductDetailsComponent,
    CreateProductComponent,
    NavigationComponent,
    EditProductComponent,
    DeleteDialogComponent,

    LoginComponentComponent,
    CustomLabelInputComponent,
    RegisterComponentComponent,
    MultiSelectDropdownComponent,
    PreviewModalComponent,
    CartComponent,
    AddCartComponent,
    AllProductsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    HttpClientModule,
    NgxSpinnerModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
