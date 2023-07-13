import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  searchText: string = '';

  clearForm() {
    this.searchText = '';
  }

  onValueChange(val: any) {
    this.searchText = val
  }

}
