import { Component, Inject } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { CartService } from './services/cart.service';
import { ProductsTableComponent } from './components/products-table/products-table.component';
import { MultiSelectDropdownComponent } from './components/multi-select-dropdown/multi-select-dropdown.component';
import { CartComponent } from './components/cart/cart.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  cartItemCount: number = 0;

  constructor(public cartService: CartService) { }

  ngOnInit(): void {
    initFlowbite();

    this.cartService.fetchCart().subscribe(
      data => {
        const count = data.cartProducts?.length
        console.log('setting count in appmodule initial fetch');

        this.cartService.changeSelectedCount(count!)

      }
    )

    this.cartService.localSelectedItemsCount$.subscribe(
      data => {
        console.log('called in appmodule count in service = ', data);
        this.cartItemCount = data
      }
    )
  }

  onOutletLoaded(component: any) {
    if (component instanceof CartComponent) {
      component.sharedCartService = this.cartService
    }
  }

}
