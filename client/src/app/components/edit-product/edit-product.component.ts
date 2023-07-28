import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from '../../services/backend.service';
import { noWhitespaceMinLengthValidator } from 'src/app/utils/custom_validators';
import { Observable, Subscription } from 'rxjs';
import { FileUploadService } from 'src/app/services/upload.service';
import { ProductService, Product, EditProductRequest } from 'src/app/services/swagger-expresscart-client';


@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
  providers: [ProductService]

})
export class EditProductComponent implements OnInit, OnDestroy {

  isLoadingProduct = true;
  isUpdatingProduct = false;

  // img-file-upload
  file: any = ''
  fileUploadURL: any = null
  @ViewChild('fileInput') fileInputRef?: ElementRef;


  fileInfos?: Observable<any>;

  formEditProduct!: FormGroup

  // subscriptions
  private subRoute?: Subscription;
  valueChangesSubscription?: Subscription;
  getProductSubscription?: Subscription;
  editProductSubscription?: Subscription;

  hasChange: boolean = false

  id?: number;
  productDetails?: Product
  notFound = false;

  get productImgUrl() {
    // if fileUploadURL is set then populate that image
    if (this.fileUploadURL) {
      return this.fileUploadURL
    }

    if (this.productDetails) {
      if (this.productDetails!.imgUrl === '#') {
        return null;
      }
      // check if already url
      if (this.productDetails?.imgUrl?.startsWith('https://')) return this.productDetails.imgUrl;

      return 'http://localhost:3000/' + this.productDetails?.imgUrl
    } return null;
  }

  constructor(private route: ActivatedRoute, private backendService: ProductService, private router: Router, private uploadService: FileUploadService) { }

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
      this.hasChange = true;

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
    this.subRoute = this.route.params.subscribe(
      params => {
        this.id = +params['id'];
        console.log('setting id to: ', this.id);


        // disable form interaction while product is loaded
        this.formEditProduct.disable();
        this.isLoadingProduct = true;

        this.getProductSubscription = this.backendService.getProduct(this.id, 'response').subscribe({
          next: (resp) => {
            console.log(resp);

            if (resp.status === 200) {
              this.productDetails = resp.body?.product;
              console.log('details = ', this.productDetails);
              // set default valuse in form
              this.formEditProduct.patchValue({
                title: this.productDetails?.title,
                description: this.productDetails?.description,
                price: this.productDetails?.price,
              })
            }
          },
          complete: () => {
            this.isLoadingProduct = false;
            // enable form interaction once product is loaded
            this.formEditProduct.enable();
          },
          error: (err) => {
            console.log('inside err ', err);
            if (err.status === 404) {
              this.notFound = true;
            }
            this.isLoadingProduct = false;
          }
        })
      }
    )

    this.valueChangesSubscription = this.formEditProduct.valueChanges.subscribe(value => {
      const { title, description, price, image } = value;
      // const imageCondititon = image !== this.productDetails?.imgUrl
      this.hasChange = (title !== this.productDetails?.title) ||
        description !== this.productDetails?.description ||
        price !== this.productDetails?.price

    });

  }

  createForm() {
    this.formEditProduct = new FormGroup({
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

  ngOnDestroy(): void {
    const subscriptions = [
      this.subRoute,
      this.valueChangesSubscription,
      this.getProductSubscription,
      this.editProductSubscription,
    ]
    subscriptions.forEach((subscription) => {
      if (subscription) {
        subscription.unsubscribe();
      }
    })
  }

  updateProduct() {
    console.log('Called update product')
    const { title, description, price } = this.formEditProduct.value;

    const editProductRequest: EditProductRequest = {
      id: this.productDetails?.id,
      title,
      description,
      price,
      file: this.file
    }

    console.log('sending values: ', editProductRequest);


    // console.log(updateProductValue)
    this.isUpdatingProduct = true;
    this.editProductSubscription = this.backendService.editProduct(editProductRequest, 'response').subscribe({
      next: (resp) => {
        console.log(resp);
        if (resp.status === 204) {
          console.log('product updated successfully');
        }
      },
      complete: () => {
        console.log('called complete after creating product');
        this.isUpdatingProduct = false;
        this.router.navigate(['/'], {
          skipLocationChange: true
        });
      },
      error: (err) => {
        console.log('something went wrong: ', err);
        this.isUpdatingProduct = false;
        this.router.navigate(['/'], {
          skipLocationChange: true
        });
        // show poper error if any
      },
    })
  }

  onSubmit(form: FormGroup) {
    if (form.valid) {
      console.log('Valid form updating product')
      this.updateProduct();
    } else {
      console.log('Invalid form');
      form.markAllAsTouched();
      form.markAsDirty();
    }
  }

  get getProductNameError() {
    const formCreateProduct = this.formEditProduct
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
    const formCreateProduct = this.formEditProduct

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
    const formCreateProduct = this.formEditProduct

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