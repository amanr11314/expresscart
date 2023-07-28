import { Component, OnDestroy, OnInit } from '@angular/core';
// import { Product } from '../../shared/Product';
import { Product } from '../../services/swagger-expresscart-client';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from '../../services/backend.service';
import { Subscription } from 'rxjs';
import { ProductService } from '../../services/swagger-expresscart-client';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
  // providers: [BackendService]
  providers: [ProductService]
})
export class ProductDetailsComponent implements OnInit, OnDestroy {

  isLoading = true;

  // subscriptions
  private getProductSubscription?: Subscription;
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


  constructor(private route: ActivatedRoute, private backendService: ProductService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.routeSubscription = this.route.params.subscribe(
      params => {
        const id = +params['id'];
        this.id = id;
        this.getProductSubscription = this.backendService.getProduct(id, 'response').subscribe({
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
  }

  ngOnDestroy(): void {
    const subscriptions = [
      this.getProductSubscription,
      this.routeSubscription
    ]
    subscriptions.forEach((subscription) => {
      if (subscription) {
        subscription.unsubscribe();
      }
    })
  }
}
