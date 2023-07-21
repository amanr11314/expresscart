import { Component } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { CartService } from './services/cart.service';
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
        this.cartService.changeSelectedCount(count!)
      }
    )

    this.cartService.localSelectedItemsCount$.subscribe(
      data => {
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
