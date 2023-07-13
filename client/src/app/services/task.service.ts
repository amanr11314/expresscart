import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, map, pipe } from 'rxjs'
import { Product } from '../Product';

// import { Task } from '../Task';
// import { TASKS } from '../mock-tasks';


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl = 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any> {
    return this.http.get<any>(this.apiUrl)
  }

  getProductDetail(id: number): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/product/details/' + id);
  }

}
