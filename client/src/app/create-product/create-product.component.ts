import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  formCreateProduct!: FormGroup

  ngOnInit(): void {
    this.formCreateProduct = new FormGroup({
      title: new FormControl(''),
      description: new FormControl(''),
      image: new FormControl('')
    });
  }

  onSubmit(form: FormGroup) {
    console.log('Valid?', form.valid); // true or false
    console.log('title', form.value.title);
    console.log('description', form.value.description);
  }

}
