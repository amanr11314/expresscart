import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../Product';
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
