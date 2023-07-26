import { Component, OnDestroy, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { CartService } from './services/cart.service';
import { CartComponent } from './components/cart/cart.component';
import { Subscription } from 'rxjs';
import { EventBusService } from './shared/event-bus.service';
import { AuthService } from './services/auth/auth.service';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductsTableComponent } from './components/products-table/products-table.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AuthService]
})
export class AppComponent implements OnInit, OnDestroy {

  cartItemCount: number = 0;
  loginSub?: Subscription;


  constructor(public cartService: CartService, private eventBusService: EventBusService, private authService: AuthService) { }

  ngOnInit(): void {
    initFlowbite();

    this.loginSub = this.authService.isLoggedIn$.subscribe({
      next: (value) => {
        if (value) {
          console.log('subscribing now', value);

          this.cartService.fetchCartCache().subscribe(
            data => {
              const count = data.cartProducts?.length
              this.cartService.changeSelectedCount(count!)
            }
          )

          this.cartService.localSelectedItemsCount$.subscribe(
            data => {
              this.cartItemCount = data
            }
          )
        }
      },
    })


  }

  ngOnDestroy(): void {
    if (this.loginSub) {
      this.loginSub.unsubscribe();
    }
  }

  onOutletLoaded(component: any) {
    if (component instanceof CartComponent) {
      component.sharedCartService = this.cartService
    }
  }
}

/**
export class AppComponent implements OnInit {
  users = [
    { id: '1', name: 'John', isActive: true },
    { id: '2', name: 'Jack', isActive: true },
    { id: '2', name: 'Mike', isActive: true },
  ]

  user$ = new BehaviorSubject<{ id: string, name: string } | null>(null)

  users$ = of(this.users)
  usernames$ = this.users$.pipe(
    map((users) => users.map((user) => user.name))
  )
  filteredUsers$ = this.users$.pipe(filter((users) => users.every((user) => user.isActive)))

  data$ = combineLatest([
    this.users$,
    this.usernames$, this.filteredUsers$
  ]).pipe(map(
    ([users, usernames, filteredUsers]) => ({
      users,
      usernames,
      filteredUsers
    })
  ))

  // documentClick$ = fromEvent(document, 'click')

  ngOnInit(): void {
    // this.documentClick$.subscribe(
    //   e => {
    //     console.log(e);

    //   }
    // )

    setTimeout(() => {
      this.user$.next({ id: '1', name: "John" })
    }, 2000)
    // this.filteredUsers$.subscribe(
    //   (users) => {
    //     console.log('users', users);

    //   }
    // )
  }
}
*/
