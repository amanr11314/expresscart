import { Component, Input, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { CartService as NewCart } from '../../services/swagger-expresscart-client'
import { Cart } from 'src/app/shared/Cart';
import { Observable, Subscription, of, tap } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { CartResponse } from 'src/app/services/swagger-expresscart-client/model/cartResponse';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {

  isLoading = false;

  @Input()
  sharedCartService?: NewCart

  cart$: Observable<Cart | null> = of();

  cart?: CartResponse

  // subscriptions
  fetchCartCacheSubscription?: Subscription;


  ngOnInit(): void {
    this.fetchInitialCart();
  }

  // fetchInitialCart() {
  //   if (!this.sharedCartService) return;
  //   this.SpinnerServcie.show();
  //   this.cart$ = this.sharedCartService.fetchCart().pipe(
  //     tap((data) => this.SpinnerServcie.hide())
  //   )
  // }

  fetchInitialCart() {

    if (!this.sharedCartService) return;
    this.isLoading = true;
    this.SpinnerServcie.show();


    this.fetchCartCacheSubscription = this.sharedCartService.getCart('response').subscribe({
      next: (resp) => {
        if (resp.status === 200) {
          this.cart = resp.body!;
        }
      },
      error: (err) => {
        console.log(err);
        this.SpinnerServcie.hide();
        this.isLoading = false;
      },
      complete: () => {
        this.SpinnerServcie.hide();
        this.isLoading = false;
      }
    })
  }

  constructor(private SpinnerServcie: NgxSpinnerService
  ) { }

}
