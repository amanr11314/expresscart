import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ProductCRUDOperationsService } from 'swagger-expresscart-client';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {
  products$?: Observable<any>;

  constructor(private productCrudService: ProductCRUDOperationsService) {

  }

  ngOnInit(): void {
    this.products$ = this.productCrudService.getProducts()
  }
}
