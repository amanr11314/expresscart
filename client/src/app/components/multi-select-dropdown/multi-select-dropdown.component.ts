import { Component, Input, Output, EventEmitter, OnInit, Inject } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Cart, CartProductsEntity } from 'src/app/shared/Cart';
import { Product } from 'src/app/shared/Product';
import { switchMap, map } from 'rxjs';


@Component({
  selector: 'app-multi-select-dropdown',
  templateUrl: './multi-select-dropdown.component.html',
  styleUrls: ['./multi-select-dropdown.component.css'],
  providers: [CartService]
})
export class MultiSelectDropdownComponent implements OnInit {


  constructor(@Inject(CartService) private cartService: CartService) { }

  @Input() list: any[] = [];

  getCartItemsId() {
    const cartproducts = this.cart?.cartProducts || []
    if (cartproducts.length) {
      return cartproducts.map(
        (product: CartProductsEntity) => {
          return product.id
        }
      )
    }
    return [];
  }

  @Output() onItemCheck = new EventEmitter();
  @Output() onItemUncheck = new EventEmitter();

  showDropDown: boolean = false


  checkedList: any[] = [];
  currentSelected: {} = {};

  cart: Cart = { cartProducts: [], totaAmount: 0 }

  ngOnInit(): void {
    // this.cartService.fetchCart().subscribe(
    //   (data) => {
    //     this.cart = data
    //   }
    // )
    // // already in cart
    // this.checkedList = this.getCartItemsId();
    // console.log(this.cart);
    // console.log(this.checkedList);

    // console.log('oninit = ', this.getCartItemsId());
    // console.log('cart', this.cart);

  }

  getSelectedValue(status: Boolean, value: String) {
    if (status) {
      this.checkedList.push(value);
    } else {
      var index = this.checkedList.indexOf(value);
      this.checkedList.splice(index, 1);
    }

    this.currentSelected = { checked: status, name: value };

    // //share checked list
    // this.shareCheckedlist();

    // //share individual selected item
    // this.shareIndividualStatus();
  }

  // when checkbox change, add/remove the item from the array
  onChange(checked: Boolean, item: Product, index: number) {
    if (checked) {
      // Removes it from the index
      this.list.splice(index, 1);

      // Push it in the first position
      this.list.unshift(item);

      this.checkedList.push(item.id);

      // call on item check
      // this.onItemCheck.emit(item)
    } else {
      // remove from checked list
      this.checkedList.splice(this.checkedList.indexOf(item.id), 1);

      // Removes it from the index
      this.list.splice(index, 1);

      // Push it to last
      this.list.push(item)

      // call on item uncheck
      // this.onItemUncheck.emit(item)
    }

    // console.log(this.checkedList);

    // //share checked list
    // this.shareCheckedlist();

    // //share individual selected item
    // this.shareIndividualStatus();
  }



}