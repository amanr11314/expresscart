import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from '../../shared/Product';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from '../../services/backend.service';
import { noWhitespaceMinLengthValidator } from 'src/app/utils/custom_validators';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
  providers: [BackendService]

})
export class EditProductComponent implements OnInit, OnDestroy {
  formEditProduct!: FormGroup
  valueChangesSubscription?: Subscription;
  backendServiceSubscription?: Subscription;
  hasChange: boolean = false

  id?: number;
  private subRoute?: any;
  productDetails?: Product

  constructor(private route: ActivatedRoute, private backendService: BackendService, private router: Router) { }

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

    this.backendServiceSubscription = this.backendService.updateProduct(updateProductValue).subscribe((response: any) => {
      console.log(response);
      this.router.navigate(['/'])
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