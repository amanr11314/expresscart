import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {

  searchText: string = '';

  @Input()
  productsList: any[] = []

  @Output()
  onProductSearch = new EventEmitter();

  @Output()
  onSearchReset = new EventEmitter();

  onSubmitSearch() {
    console.log('searchtext = ', this.searchText);
    this.onProductSearch.emit(this.searchText);
  }

  clearForm() {
    this.searchText = '';
    this.onSearchReset.emit();
  }

  onValueChange(val: any) {
    this.searchText = val
  }

  // for dropdown
  onItemChange(count: number) {
    console.log('COUNT = ', count);
  }
}
