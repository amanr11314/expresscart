import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, of } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from 'src/app/shared/User';
import { EventBusService } from 'src/app/shared/event-bus.service';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
  providers: [AuthService]
})
export class NavigationComponent implements OnInit, OnDestroy {

  eventBusSub?: Subscription;

  @Input()
  cartItemCount?: number;

  user?: User;
  userSubscription?: Subscription;
  constructor(public authService: AuthService, private eventBusService: EventBusService) { }


  ngOnInit(): void {
    // this.user$ = (this.authService.getuserDetails$)
    this.userSubscription = this.authService.getUserDetails().subscribe((user) => {
      if (user) {
        this.user = user;
      }
    })
    this.eventBusSub = this.eventBusService.on('logout', () => {
      this.logOut();
    })
  }

  ngOnDestroy(): void {

    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }

    if (this.eventBusSub) {
      this.eventBusSub.unsubscribe();
    }
  }

  logOut() {
    this.authService.doLogout();
  }
}
