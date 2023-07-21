import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from 'src/app/shared/User';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
  providers: [AuthService]
})
export class NavigationComponent implements OnInit {

  @Input()
  cartItemCount?: number;

  user?: User
  constructor(public authService: AuthService) {
  }

  ngOnInit(): void {
    this.user = this.authService.getUserDetails
  }

  logOut() {
    this.authService.doLogout();
    this.user = undefined;
  }
}
