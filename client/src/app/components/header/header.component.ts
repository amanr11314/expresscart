import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from 'src/app/shared/Product';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {

  searchText: string = '';

  @Input()
  products$?: Observable<Product[]>;

  @Output()
  onProductSearch = new EventEmitter();

  @Output()
  onSearchReset = new EventEmitter();

  onSubmitSearch() {
    if (!!this.searchText.trim()) {
      console.log('searchtext = ', this.searchText);
      this.onProductSearch.emit(this.searchText);
    }
  }

  clearForm() {
    this.searchText = '';
    this.onSearchReset.emit();
  }

  onValueChange(val: any) {
    this.searchText = val
    if (val === '') {
      this.clearForm();
    }
  }

  // for dropdown
  onItemChange(_: number) {
    // console.log('COUNT = ', count);
  }
}
