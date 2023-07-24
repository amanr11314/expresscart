import { Component, Input, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/shared/Cart';
import { Observable, of } from 'rxjs';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {

  @Input()
  sharedCartService?: CartService

  cart$: Observable<Cart | null> = of();


  ngOnInit(): void {
    this.fetchInitialCart();
  }

  fetchInitialCart() {
    if (!this.sharedCartService) return;
    this.cart$ = this.sharedCartService.fetchCart()
  }

}
