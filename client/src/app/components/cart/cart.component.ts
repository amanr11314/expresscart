import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/shared/Cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [CartComponent]
})
export class CartComponent implements OnInit {
  cart?: Cart;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.fetchInitialCart();
  }

  fetchInitialCart() {
    this.cartService.fetchCart().subscribe(
      data => {
        this.cart = data
      }
    )
  }

  getProductsFromCart() {
    // Todo extract product list from cart for easy iteration
  }

}
