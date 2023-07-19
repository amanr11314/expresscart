import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../shared/Product';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from '../../services/backend.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
  providers: [BackendService]
})
export class ProductDetailsComponent implements OnInit, OnDestroy {


  private backendServiceSubscription?: Subscription;
  private routeSubscription?: Subscription;


  id?: number;
  productDetails?: Product


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


  constructor(private route: ActivatedRoute, private backendService: BackendService) { }

  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe(
      params => {
        this.id = +params['id'];
      }
    )
    this.backendServiceSubscription = this.backendService.getProductDetail(this.id!).subscribe(
      (data) => {
        console.log(JSON.stringify(data))
        return this.productDetails = data['product']
      }
    )
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
