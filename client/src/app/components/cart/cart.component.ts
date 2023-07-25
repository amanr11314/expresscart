import { Component, Input, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/shared/Cart';
import { Observable, of, tap } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';


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
    this.SpinnerServcie.show();
    this.cart$ = this.sharedCartService.fetchCart().pipe(
      tap((data) => this.SpinnerServcie.hide())
    )
  }

  constructor(private SpinnerServcie: NgxSpinnerService
  ) { }

}
