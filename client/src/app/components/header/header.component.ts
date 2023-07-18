import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  searchText: string = '';

  @Input()
  productsList: any[] = []

  clearForm() {
    this.searchText = '';
  }

  onValueChange(val: any) {
    this.searchText = val
  }

  shareCheckedList(item: any[]) {
    console.log(item);
  }
  shareIndividualCheckedList(item: {}) {
    console.log(item);
  }

}
