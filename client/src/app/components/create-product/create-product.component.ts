import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/shared/Product';
import { noWhitespaceMinLengthValidator } from 'src/app/utils/custom_validators';
import { BackendService } from 'src/app/services/backend.service';
import { Subscription } from 'rxjs';
import { FileUploadService } from 'src/app/services/upload.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { ProductService, CreateProductRequest } from '../../services/swagger-expresscart-client';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css'],
  providers: [ProductService]
})
export class CreateProductComponent implements OnInit, OnDestroy {

  isLoading = false;

  // img-file-upload
  file: any = ''
  fileUploadURL: any = null
  @ViewChild('fileInput') fileInputRef?: ElementRef;

  fileInfos?: Observable<any>;

  formCreateProduct!: FormGroup

  // subscriptions
  createProductSubscription?: Subscription;

  get productImgUrl() {
    // if fileUploadURL is set then populate that image
    if (this.fileUploadURL) {
      return this.fileUploadURL
    }

    return null;
  }

  constructor(private backendService: ProductService, private router: Router, private uploadService: FileUploadService, private location: Location) { }

  resetFile() {
    if (this.file) {
      this.file = ''
      this.fileInputRef!.nativeElement.value = null;
    }
  }

  selectFile(event: any): void {
    const img = event.target.files[0];
    if (img) {
      this.file = img;

      // preview handling using FileReader API
      const reader = new FileReader();
      reader.onload = () => {
        this.fileUploadURL = reader.result as string;
      }
      reader.readAsDataURL(img)
    }
  }

  ngOnInit(): void {
    this.createForm();
  }


  createForm() {
    this.formCreateProduct = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        noWhitespaceMinLengthValidator(4),
      ]),
      description: new FormControl('', [
        Validators.required,
        noWhitespaceMinLengthValidator(6)
      ]),
      image: new FormControl(''),
      price: new FormControl(0, [
        Validators.required,
        Validators.min(1)
      ])
    });
  }

  getFormValidationErrors() {

    console.log('%c ==>> Validation Errors: ', 'color: red; font-weight: bold; font-size:25px;');

    let totalErrors = 0;

    Object.keys(this.formCreateProduct!.controls).forEach(key => {
      const controlErrors: any = this?.formCreateProduct?.get(key)?.errors;
      if (controlErrors != null) {
        totalErrors++;
        Object.keys(controlErrors).forEach(keyError => {
          console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
        });
      }
    });

    console.log('Number of errors: ', totalErrors);
  }

  ngOnDestroy(): void {
    const subscriptions = [
      this.createProductSubscription,
    ]
    subscriptions.forEach((subscription) => {
      if (subscription) {
        subscription.unsubscribe();
      }
    })
  }

  createProduct() {
    this.isLoading = true;
    const { title, description, price, ...rest } = this.formCreateProduct.value;

    const product: Product = {
      title,
      description,
      price,
    }

    const createProductRequest: CreateProductRequest = {
      ...product,
      file: this.file
    }

    this.createProductSubscription = this.backendService.createProduct(createProductRequest, 'response').subscribe({
      next: (resp) => {
        console.log(resp);
        if (resp.status === 200) {
          console.log('procut created successfully');
        }
      },
      complete: () => {
        console.log('called complete after creating product');
        this.isLoading = false;
        this.router.navigate(['/'], {
          skipLocationChange: true
        });
      },
      error: (err) => {
        console.log('something went wrong: ', err);
        this.isLoading = false;
        // show poper error if any
      },
    })
  }

  onSubmit(form: FormGroup) {
    if (form.valid) {
      console.log('Valid form creating product')
      this.createProduct();
    } else {
      console.log('Invalid form');
      console.log('Marking everything as touched');
      form.markAllAsTouched();
    }
  }

  get getProductNameError() {
    const formCreateProduct = this.formCreateProduct
    return (
      formCreateProduct?.get('title')?.invalid &&
        (formCreateProduct?.get('title')?.dirty ||
          formCreateProduct?.get('title')?.touched) &&
        formCreateProduct.get('title')?.errors
        ?
        (formCreateProduct.get('title')?.errors?.['required']) ?
          "Name is required" :
          (formCreateProduct.get('title')?.errors?.['noWhitespaceMinLength']) ?
            "Name must be at least 4 characters long" : ""
        : ""
    )
  }

  get getProductDescError() {
    const formCreateProduct = this.formCreateProduct

    return (
      formCreateProduct?.get('description')?.invalid &&
        (formCreateProduct?.get('description')?.dirty ||
          formCreateProduct?.get('description')?.touched) &&
        formCreateProduct.get('description')?.errors
        ?
        (formCreateProduct.get('description')?.errors?.['required']) ?
          "Description is required" :
          (formCreateProduct.get('description')?.errors?.['noWhitespaceMinLength']) ?
            "Description must be at least 6 characters long" : ""
        : ""
    )
  }

  get getProductPriceError() {
    const formCreateProduct = this.formCreateProduct

    return (
      formCreateProduct?.get('price')?.invalid &&
        (formCreateProduct?.get('price')?.dirty ||
          formCreateProduct?.get('price')?.touched) &&
        formCreateProduct.get('price')?.errors
        ?
        (formCreateProduct.get('price')?.errors?.['required']) ?
          "Price is required" :
          (formCreateProduct.get('price')?.errors?.['min']) ?
            "Price value must be greater than 0" : ""
        : ""
    )
  }



}
