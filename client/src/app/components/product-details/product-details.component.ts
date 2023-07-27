import { Component, OnDestroy, OnInit } from '@angular/core';
// import { Product } from '../../shared/Product';
import { Product } from 'swagger-expresscart-client';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from '../../services/backend.service';
import { Subscription } from 'rxjs';
import { ProductCRUDOperationsService } from 'swagger-expresscart-client';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
  // providers: [BackendService]
  providers: [ProductCRUDOperationsService]
})
export class ProductDetailsComponent implements OnInit, OnDestroy {

  isLoading = true;


  private backendServiceSubscription?: Subscription;
  private routeSubscription?: Subscription;


  id?: number;
  productDetails?: Product
  notFound = false;


  get productImgUrl() {
    if (this.productDetails) {
      if (this.productDetails!.imgUrl === '#') {
        return null;
      }
      // check if already url
      if (this.productDetails?.imgUrl?.startsWith('https://')) return this.productDetails.imgUrl;

      return 'http://localhost:3000/' + this.productDetails?.imgUrl
    } return null;
  }


  constructor(private route: ActivatedRoute, private backendService: ProductCRUDOperationsService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.routeSubscription = this.route.params.subscribe(
      params => {
        const id = +params['id'];
        this.id = id;
        this.backendServiceSubscription = this.backendService.getProduct(id, 'response').subscribe({
          next: (resp) => {

            if (resp.status === 200) {
              this.productDetails = resp.body?.product;
            }
          },
          complete: () => {
            this.isLoading = false
          },
          error: (err) => {
            console.log('inside err ', err);
            if (err.status === 404) {
              this.notFound = true;
            }
            this.isLoading = false;

          }
        })
      }
    )

    // this.backendServiceSubscription = this.backendService.getProductDetail(this.id!).subscribe({
    //   next: (data) => {
    //     console.log(JSON.stringify(data))
    //     return this.productDetails = data['product']
    //   },
    //   complete: () => {
    //     this.isLoading = false;
    //   },
    //   error: () => {
    //     this.isLoading = false;
    //   }
    // })
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
    if (this.backendServiceSubscription) {
      this.backendServiceSubscription.unsubscribe();
    }
  }
}
