import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cart } from '../shared/Cart';
import { BehaviorSubject, Observable, ReplaySubject, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  apiUrl = 'http://localhost:3000/cart'

  private sharedCart$?: Observable<Cart>;

  private localSelectedItemsCount = new BehaviorSubject(0);
  localSelectedItemsCount$ = this.localSelectedItemsCount.asObservable();

  changeSelectedCount(count: number) {
    this.localSelectedItemsCount.next(count);
  }

  private cartSource: ReplaySubject<Cart> = new ReplaySubject(1)
  cart = this.cartSource.asObservable();

  constructor(private http: HttpClient) { }

  change_cart(newCart: Cart) {
    this.cartSource.next(newCart)
  }

  // fetchCart(): Observable<Cart> {
  //   return this.http.get<Cart>(this.apiUrl);
  // }

  fetchCart(): Observable<Cart> {
    // API potimization: Check if the shared data is already available
    if (!this.sharedCart$) {
      this.sharedCart$ = this.http.get<Cart>(this.apiUrl)
        .pipe(
          // shareReplay with a buffer size of 1 to replay the last emitted value to new subscribers
          shareReplay(1)
        )
    }
    return this.sharedCart$;
  }

  addToCart(productId: any): Observable<any> {
    const data = {
      productId
    }
    return this.http.post<any>(this.apiUrl, data)
  }

  removeFromCart(productId: any): Observable<any> {
    const data = {
      productId
    }
    return this.http.post<any>(this.apiUrl + '/remove', data)
  }

}

