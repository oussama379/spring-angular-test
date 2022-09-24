import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Order} from "../Models/Order";
import {Article} from "../Models/Article";

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {

  private order = new BehaviorSubject<Order>({id : 0, reference : '', date : '', articles : Array<Article>()});
  currentOrder = this.order.asObservable();

  private orderNumbers = new BehaviorSubject<number>(0);
  currentOrderNumbers = this.orderNumbers.asObservable();

  constructor() { }

  changeOrder(order : Order){
    this.order.next(order);
  }
  changeNumberOfOrders(nb : number){
    this.orderNumbers.next(nb);
  }
}
