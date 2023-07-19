import { Component, Inject, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { Cart, CartProductsEntity } from 'src/app/shared/Cart';
import { Product } from 'src/app/shared/Product';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [CartService]
})
export class HeaderComponent {

  searchText: string = '';

  @Input()
  productsList: any[] = []

  clearForm() {
    this.searchText = '';
  }

  onValueChange(val: any) {
    this.searchText = val
  }

  // onItemCheck(item: Product) {

  //   this.cartService.addToCart(item.id).subscribe(
  //     (data: any) => {
  //       console.log('Added product = ', item);
  //       console.log(data);
  //     }

  //   )
  // }

  // onItemUncheck(item: Product) {
  //   console.log('Removed product = ', item);
  //   this.cartService.removeFromCart(item.id).subscribe(
  //     (data: any) => {
  //       console.log('Removed product = ', item);
  //       console.log(data);

  //     }
  //   )
  // }

}
