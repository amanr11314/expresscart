import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { CartService as NewCart } from '../../services/swagger-expresscart-client'
import { CartProductsEntity } from 'src/app/shared/Cart';
import { Product } from 'src/app/shared/Product';
import { AddToCartRequest } from 'src/app/services/swagger-expresscart-client/model/addToCartRequest';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-multi-select-dropdown',
  templateUrl: './multi-select-dropdown.component.html',
  styleUrls: ['./multi-select-dropdown.component.css'],
})
export class MultiSelectDropdownComponent implements OnInit, OnChanges, OnDestroy {

  // subscriptions
  deleteCartItemSubscription?: Subscription;
  fetchCartCacheSubscription?: Subscription;
  localSelectedItemsCountAddSubscription?: Subscription;
  localSelectedItemsCountRemoveSubscription?: Subscription;


  constructor(private newCartService: NewCart) { }

  ngOnInit(): void {
    this.list = [...this.productList];
    this.fetchInitialCart();
  }

  ngOnChanges(changes: SimpleChanges): void {

    // Detect changes to the @Input() property

    if (changes['productList'] && changes['productList'].currentValue) {
      this.list = changes['productList'].currentValue;
    }
    if (changes['updatedCart'] && changes['updatedCart'].currentValue) {
      console.log('changes detected in cart');

      const _updatedCart = changes['updatedCart'].currentValue?.map(
        (val: any) => val.id
      )
      this.selectedOptions = _updatedCart!;
    }
  }

  @Input()
  updatedCart: any[] = []

  @Input() productList: any[] = [];

  list: any[] = []

  selectedOptions: string[] = [];

  showDropDown = false;

  @Output() onItemChange = new EventEmitter();

  toggleOption(option: any, idx: number) {
    const index = this.selectedOptions.indexOf(option.id);


    if (index === -1) {
      console.log('adding to top',)
      // Removes it from the index
      this.list.splice(idx, 1);

      // Push it in the first position
      this.list.unshift(option);

      // add to selected list
      this.selectedOptions.push(option.id);

      const body: AddToCartRequest = {
        productId: option.id
      }
      this.newCartService.addToCart(body, 'response').subscribe({
        next: (resp) => {
          if (resp.status === 200) {
            console.log(resp.body);

            this.onItemChange.emit(this.selectedOptions.length)
            this.newCartService.changeSelectedCount(this.selectedOptions.length)
            this.localSelectedItemsCountAddSubscription = this.newCartService.localSelectedItemsCount$.subscribe(
              data => {
                console.log('changed in service', data);
              }
            )
          }
        },
        error: (err) => {
          // revert optimistic changes on error
          this.selectedOptions = this.selectedOptions.filter(e => e !== option.id)
        },
      })

    } else {
      // remove from selected list
      this.selectedOptions.splice(index, 1);

      // Removes it from the index
      this.list.splice(idx, 1);

      // Push it to last
      this.list.push(option)

      // remove from cart
      const body: AddToCartRequest = {
        productId: option.id
      }
      this.deleteCartItemSubscription = this.newCartService.deleteCartItem(body, 'response').subscribe({
        next: (resp) => {
          if (resp.status === 200) {
            console.log(resp.body);

            this.onItemChange.emit(this.selectedOptions.length)
            this.newCartService.changeSelectedCount(this.selectedOptions.length)
            this.localSelectedItemsCountRemoveSubscription = this.newCartService.localSelectedItemsCount$.subscribe(
              data => {
                console.log('changed in service', data);
              }
            )
          }
        },
        error: (err) => {

          //revert in case of error
          this.selectedOptions.push(option.id)
        },
      })
    }
  }

  fetchInitialCart() {

    this.fetchCartCacheSubscription = this.newCartService.fetchCartCache().subscribe({
      next: (resp) => {
        const v = resp.cartProducts?.map(
          (val) => val.id
        )
        this.selectedOptions = v || [];
      },
      error: (err) => {
        console.log(err);
      }
    })

    this.newCartService.changeSelectedCount(this.selectedOptions.length)
    this.customSort(this.list, this.selectedOptions)

  }

  customSort(list: Product[], selectedOptions: string[]) {
    list.sort(function (x, y) {
      const a = selectedOptions.includes(x.id!)
      const b = selectedOptions.includes(y.id!)
      if (a && b) {
        return 0;
      }
      if (a) {
        return -1;
      }
      return 1;
    });
  }

  ngOnDestroy(): void {
    const subscriptions = [
      this.deleteCartItemSubscription,
      this.fetchCartCacheSubscription,
      this.localSelectedItemsCountAddSubscription,
      this.localSelectedItemsCountRemoveSubscription,
    ]
    subscriptions.forEach((subscription) => {
      if (subscription) {
        subscription.unsubscribe();
      }
    })
  }

}