import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from '../../shared/Product';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from '../../services/backend.service';
import { noWhitespaceMinLengthValidator } from 'src/app/utils/custom_validators';
import { Observable, Subscription } from 'rxjs';
import { FileUploadService } from 'src/app/services/upload.service';


@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
  providers: [BackendService]

})
export class EditProductComponent implements OnInit, OnDestroy {

  // img-file-upload
  file: any = ''
  fileUploadURL: any = null
  @ViewChild('fileInput') fileInputRef?: ElementRef;


  fileInfos?: Observable<any>;

  formEditProduct!: FormGroup
  valueChangesSubscription?: Subscription;
  backendServiceSubscription?: Subscription;
  hasChange: boolean = false

  id?: number;
  private subRoute?: any;
  productDetails?: Product

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

  constructor(private route: ActivatedRoute, private backendService: BackendService, private router: Router, private uploadService: FileUploadService) { }

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
        this.backendServiceSubscription = this.backendService.getProductDetail(this.id).subscribe(
          (data) => {
            console.log(JSON.stringify(data))
            this.productDetails = data['product']

            // set default valuse in form
            this.formEditProduct.patchValue({
              title: this.productDetails?.title,
              description: this.productDetails?.description,
              price: this.productDetails?.price,
            })

            return this.productDetails;

          }
        )
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
    if (this.subRoute) {
      this.subRoute.unsubscribe();
    }
    if (this.valueChangesSubscription) {
      this.valueChangesSubscription.unsubscribe();
    }
    if (this.backendServiceSubscription) {
      this.backendServiceSubscription.unsubscribe();
    }
  }

  updateProduct() {
    console.log('Called update product')
    const { title, description, price } = this.formEditProduct.value;
    const updateProductValue: Product = {
      id: this.productDetails?.id,
      title,
      description,
      price
    }

    // console.log(updateProductValue)

    this.backendServiceSubscription = this.backendService.updateProduct(updateProductValue, this.file).subscribe({
      next: (val) => {
        console.log('called next after updating ', val);
      },
      complete: () => {
        window.location.href = '/'
      }
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

}