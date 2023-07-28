import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ProductService } from '../../services/swagger-expresscart-client';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {
  products$?: Observable<any>;

  constructor(private productCrudService: ProductService) {

  }

  ngOnInit(): void {
    this.products$ = this.productCrudService.getProducts()
  }
}
