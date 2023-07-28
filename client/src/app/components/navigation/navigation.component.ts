import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, of } from 'rxjs';
import { AuthService as NewAuthService } from 'src/app/services/swagger-expresscart-client';
import { User } from 'src/app/services/swagger-expresscart-client/model/user';
import { EventBusService } from 'src/app/shared/event-bus.service';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit, OnDestroy {

  eventBusSub?: Subscription;

  @Input()
  cartItemCount?: number;

  user?: User;
  userSubscription?: Subscription;
  constructor(private eventBusService: EventBusService, private newAuthService: NewAuthService) { }


  ngOnInit(): void {

    this.newAuthService.getUserDetails().subscribe((user) => {
      if (user) {
        console.log('foubd user in nav: ', user);
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
    this.newAuthService.doLogout();
  }
}
