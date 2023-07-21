import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
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

  user?: User
  constructor(public authService: AuthService, private eventBusService: EventBusService) { }


  ngOnInit(): void {
    this.user = this.authService.getUserDetails
    this.eventBusSub = this.eventBusService.on('logout', () => {
      this.logOut();
    })
  }

  ngOnDestroy(): void {
    if (this.eventBusSub) {
      this.eventBusSub.unsubscribe();
    }
  }

  logOut() {
    this.authService.doLogout();
    this.user = undefined;
  }
}
