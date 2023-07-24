import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, Subject, debounceTime, distinctUntilChanged, of, switchMap, tap } from 'rxjs';
import { Product } from 'src/app/shared/Product';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {

  private readonly searchSubject = new Subject<string | undefined>();


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

  public onSearchQueryInput(event: Event): void {
    const searchQuery = (event.target as HTMLInputElement).value;
    this.searchSubject.next(searchQuery?.trim());
  }

  ngOnInit(): void {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((searchQuery => of(searchQuery)))
    ).subscribe((searchTerm) => {
      console.log('calling search on ', searchTerm);

      this.onProductSearch.emit(searchTerm);
    })
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
    // this.onProductSearch.emit(val);
  }

  // for dropdown
  onItemChange(_: number) {
    // console.log('COUNT = ', count);
  }
}
