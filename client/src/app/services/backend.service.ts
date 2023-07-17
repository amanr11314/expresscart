import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, retry } from 'rxjs'
import { Product } from '../shared/Product';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private apiUrl = 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any> {
    return this.http.get<any>(this.apiUrl)
  }

  getProductDetail(id: number): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/product/details/' + id);
  }

  createProduct(product: Product): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/product/create', product)
  }

  updateProduct(product: Product): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/product/edit', product)
  }

  deleteProduct(id: number | string): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/product/delete', { id })
  }
}
