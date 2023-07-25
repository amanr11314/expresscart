import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http'
import { Observable, map, shareReplay } from 'rxjs'
import { Product } from '../shared/Product';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private apiUrl = 'http://localhost:3000'

  private sharedProducts$?: Observable<Product[]>;

  constructor(private http: HttpClient) { }

  getProducts(params?: any): Observable<Product[]> {
    if (!this.sharedProducts$) {

      if (params?.search || params?.order) {

        return this.http.get<any>(this.apiUrl, { params })
          .pipe(
            map((data: { products: Product[] }) => {
              return data.products
            }),
            shareReplay(1)
          )
      }
      else {

        return this.http.get<any>(this.apiUrl)
          .pipe(
            map((data: { products: Product[] }) => {
              return data.products
            }),
            shareReplay(1)
          )
      }
    }
    return this.sharedProducts$;
  }

  getProductDetail(id: number): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/product/details/' + id);
  }

  createProduct(product: Product, file: any): Observable<any> {
    let formData = new FormData();

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
    let updateFormData = new FormData();
    console.log(product['id'])
    console.log(product.id)
    updateFormData.append('id', product?.id!)
    updateFormData.append('title', product.title)
    updateFormData.append('description', product.description)
    updateFormData.append('price', product.price.toString())

    if (file) {
      console.log('appending file: ', file);

      updateFormData.append('file', file)
      console.log(updateFormData.get('id'));

    }

    const req = new HttpRequest('POST', this.apiUrl + '/product/edit', updateFormData, {
      reportProgress: true,
      responseType: 'json'
    });
    console.debug("formdata", updateFormData.getAll('id'))
    console.log(req.body)


    // return this.http.post<any>(this.apiUrl + '/product/edit', product, httpOptions)
    return this.http.request(req)
  }

  deleteProduct(id: number | string): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/product/delete', { id })
  }
}
