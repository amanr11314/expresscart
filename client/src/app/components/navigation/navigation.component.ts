import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
  providers: [AuthService]
})
export class NavigationComponent implements OnInit {
  constructor(public authService: AuthService) { }

  ngOnInit(): void {

  }

  logOut() {
    this.authService.doLogout();
  }
}
