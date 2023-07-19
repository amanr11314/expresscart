import { Component, Input, Output, EventEmitter, OnInit, Inject } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { CartProductsEntity } from 'src/app/shared/Cart';
import { Product } from 'src/app/shared/Product';


@Component({
  selector: 'app-multi-select-dropdown',
  templateUrl: './multi-select-dropdown.component.html',
  styleUrls: ['./multi-select-dropdown.component.css'],
  providers: [CartService]
})
export class MultiSelectDropdownComponent implements OnInit {


  constructor(@Inject(CartService) private cartService: CartService) { }

  ngOnInit(): void {
    this.fetchInitialCart();
  }

  @Input() list: any[] = [];
  selectedOptions: string[] = [];

  showDropDown = false;

  @Output() onItemCheck = new EventEmitter();
  @Output() onItemUncheck = new EventEmitter();

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
            console.log(option.title + ' added to cart ');
            console.log(value);
          },
          error(err) {
            console.log(option.title + ' not added to cart ');
            console.log(err);
          },
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
            console.log(option.title + ' removed from cart ');
            console.log(value);
          },
          error(err) {
            console.log(option.title + ' not removed from cart ');
            console.log(err);
          },
        }
      )
      // this.updateOptionStatus(option.id, false); // Update status to 'false'
    }
  }

  fetchInitialCart() {
    this.cartService.fetchCart().subscribe(
      data => {
        const v = data.cartProducts?.map(
          (val: CartProductsEntity) => val.id
        );
        this.selectedOptions = v!;

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