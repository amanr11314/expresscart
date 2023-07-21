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

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css'],
  providers: [BackendService]
})
export class CreateProductComponent implements OnInit, OnDestroy {

  // img-file-upload
  file: any = ''
  fileUploadURL: any = null
  @ViewChild('fileInput') fileInputRef?: ElementRef;

  fileInfos?: Observable<any>;

  formCreateProduct!: FormGroup
  backendServiceSubscription?: Subscription;

  get productImgUrl() {
    // if fileUploadURL is set then populate that image
    if (this.fileUploadURL) {
      return this.fileUploadURL
    }

    return null;
  }

  constructor(private backendService: BackendService, private router: Router, private uploadService: FileUploadService) { }

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
    if (this.backendServiceSubscription) {
      this.backendServiceSubscription.unsubscribe();
    }
  }

  createProduct() {
    const { title, description, price, ...rest } = this.formCreateProduct.value;

    const product: Product = {
      title,
      description,
      price,
    }
    this.backendServiceSubscription = this.backendService.createProduct(product, this.file).subscribe({
      next: (val) => {
        console.log('called next after creating ', val);
      },
      complete: () => {
        console.log('called complete after creating product');
        window.location.href = '/'
      }
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

}
