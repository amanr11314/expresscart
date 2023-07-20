import { Component, Input, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Cart, CartProductsEntity } from 'src/app/shared/Cart';
import { Product } from 'src/app/shared/Product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  // providers: [CartComponent]
})
export class CartComponent implements OnInit {
  cart?: Cart;

  @Input()
  sharedCartService?: CartService

  // constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.fetchInitialCart();
  }

  fetchInitialCart() {
    if (!this.sharedCartService) return;
    this.sharedCartService.fetchCart().subscribe(
      data => {
        this.cart = data
      }
    )
  }

}
