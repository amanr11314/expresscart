import { Component, Input, Output, EventEmitter, OnInit, Inject, OnChanges, SimpleChanges } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { CartProductsEntity } from 'src/app/shared/Cart';
import { Product } from 'src/app/shared/Product';


@Component({
  selector: 'app-multi-select-dropdown',
  templateUrl: './multi-select-dropdown.component.html',
  styleUrls: ['./multi-select-dropdown.component.css'],
  // providers: [CartService]
})
export class MultiSelectDropdownComponent implements OnInit, OnChanges {


  constructor(private cartService: CartService) { }

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
      // Removes it from the index
      this.list.splice(idx, 1);

      // Push it in the first position
      this.list.unshift(option);

      // add to selected list
      this.selectedOptions.push(option.id);

      // add this product to cart
      this.cartService.addToCart(option.id).subscribe(
        {
          next(value) {
          },
          error: (err) => {
            // revert optimistic changes on error
            this.selectedOptions = this.selectedOptions.filter(e => e !== option.id)
          },
          complete: () => {
            this.onItemChange.emit(this.selectedOptions.length)
            this.cartService.changeSelectedCount(this.selectedOptions.length)
            this.cartService.localSelectedItemsCount$.subscribe(
              data => {
                console.log('changed in service', data);
              }
            )
          }
        }
      )
      // this.updateOptionStatus(option.id, true); // Update status to 'true'
    } else {
      // remove from selected list
      this.selectedOptions.splice(index, 1);

      // Removes it from the index
      this.list.splice(idx, 1);

      // Push it to last
      this.list.push(option)

      // remove from cart
      this.cartService.removeFromCart(option.id).subscribe(
        {
          next(value) {
          },
          error: (err) => {
            //revert in case of error
            this.selectedOptions.push(option.id)
          },
          complete: () => {
            this.onItemChange.emit(this.selectedOptions.length)
            this.cartService.changeSelectedCount(this.selectedOptions.length)
            this.cartService.localSelectedItemsCount$.subscribe(
              data => {
                console.log('changed in service', data);
              }
            )
          }
        }
      )
    }

    // this.onItemChange.emit(this.selectedOptions.length)
    // this.cartService.changeSelectedCount(this.selectedOptions.length)
    // this.cartService.localSelectedItemsCount$.subscribe(
    //   data => {
    //     console.log('changed in service', data);
    //   }
    // )

  }

  fetchInitialCart() {

    this.cartService.fetchCartCache().subscribe(
      data => {
        const v = data.cartProducts?.map(
          (val: CartProductsEntity) => val.id
        );
        this.selectedOptions = v!;

        this.cartService.changeSelectedCount(this.selectedOptions.length)
        // maintain selected products at top
        this.customSort(this.list, this.selectedOptions)

      }
    )
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

}