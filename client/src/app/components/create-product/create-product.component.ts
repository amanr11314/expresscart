import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/Product';
import { noWhitespaceMinLengthValidator } from 'src/app/utils/custom_validators';
import { BackendService } from 'src/app/services/backend.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css'],
  providers: [BackendService]
})
export class CreateProductComponent implements OnInit, OnDestroy {


  formCreateProduct!: FormGroup
  backendServiceSubscription?: Subscription;

  constructor(private backendService: BackendService, private router: Router) { }

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
    this.backendServiceSubscription = this.backendService.createProduct(product).subscribe((response: any) => {
      console.log(response);
      this.router.navigate(['/'])
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
