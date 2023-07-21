import { Component, Input, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Cart, CartProductsEntity } from 'src/app/shared/Cart';
import { Product } from 'src/app/shared/Product';
import { BehaviorSubject, Subscription, map, tap, first, Observable, of } from 'rxjs';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  // providers: [CartComponent]
})
export class CartComponent implements OnInit {
  // cart?: Cart;
  cart: any;

  @Input()
  sharedCartService?: CartService

  cart$: Observable<Cart | null> = of();

  // constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.fetchInitialCart();
  }

  fetchInitialCart() {
    if (!this.sharedCartService) return;
    // this.sharedCartService.fetchCart().subscribe(
    //   data => {
    //     this.cart = data
    //   }
    // )
    this.cart$ = this.sharedCartService.fetchCart()
  }

}
