import { Component, OnDestroy, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { CartService as NewCart } from './services/swagger-expresscart-client'
import { CartComponent } from './components/cart/cart.component';
import { Subscription } from 'rxjs';
import { EventBusService } from './shared/event-bus.service';
import { AuthService as NewAuthService } from './services/swagger-expresscart-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {

  cartItemCount: number = 0;

  // subscriptions
  loginSub?: Subscription;
  fetchCartCacheSub?: Subscription;
  localSelectedItemsCountSub?: Subscription;


  constructor(private eventBusService: EventBusService, private newCartService: NewCart, private newAuthService: NewAuthService) { }

  ngOnInit(): void {
    initFlowbite();

    this.loginSub = this.newAuthService.isLoggedIn$.subscribe({
      next: (value) => {
        if (value) {

          this.fetchCartCacheSub = this.newCartService.fetchCartCache().subscribe({
            next: (data) => {
              const count = data.cartProducts?.length
              this.newCartService.changeSelectedCount(count || 0)
            },
            error: (err) => {
              console.log(err);
            }
          })

          this.localSelectedItemsCountSub = this.newCartService.localSelectedItemsCount$.subscribe({
            next: (val) => {
              this.cartItemCount = val;
            }
          })
        }
      },
    })


  }

  ngOnDestroy(): void {
    const subscriptions = [
      this.loginSub,
      this.localSelectedItemsCountSub,
      this.fetchCartCacheSub
    ]
    subscriptions.forEach((subscription) => {
      if (subscription) {
        subscription.unsubscribe();
      }
    })
  }

  onOutletLoaded(component: any) {
    if (component instanceof CartComponent) {
      component.sharedCartService = this.newCartService
    }
  }
}