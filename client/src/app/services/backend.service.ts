import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http'
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

  createProduct(product: Product, file: any): Observable<any> {
    const formData = new FormData();

    formData.append('title', product.title)
    formData.append('description', product.description)
    formData.append('price', product.price.toString())

    if (file) {
      console.log('appending file: ', file);

      formData.append('file', file)
    }

    const req = new HttpRequest('POST', this.apiUrl + '/product/create', formData, {
      reportProgress: true,
      responseType: 'json'
    });


    // return this.http.post<any>(this.apiUrl + '/product/create', product, httpOptions)
    return this.http.request(req)
  }

  updateProduct(product: Product, file: any): Observable<any> {
    // return this.http.post<any>(this.apiUrl + '/product/edit', product)
    const formData = new FormData();

    formData.append('title', product.title)
    formData.append('description', product.description)
    formData.append('price', product.price.toString())

    if (file) {
      console.log('appending file: ', file);

      formData.append('file', file)
    }

    const req = new HttpRequest('POST', this.apiUrl + '/product/edit', formData, {
      reportProgress: true,
      responseType: 'json'
    });


    // return this.http.post<any>(this.apiUrl + '/product/edit', product, httpOptions)
    return this.http.request(req)
  }

  deleteProduct(id: number | string): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/product/delete', { id })
  }
}
