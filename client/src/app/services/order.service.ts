import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {Order} from "../Models/Order";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) {
  }

  getOrders(): Observable<any> {
    return this.http.get<any>(environment.backendUrl + '/order');
  }

  addOrder(order: Order): Observable<any> {
    return this.http.post<any>(environment.backendUrl + '/order', order);
  }

  editOrder(order: Order) : Observable<any>{
    return this.http.put<any>(environment.backendUrl+"/order/"+order.id, order);
  }
}
