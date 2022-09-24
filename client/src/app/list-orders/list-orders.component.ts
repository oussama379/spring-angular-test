import { Component, OnInit } from '@angular/core';
import {Order} from "../Models/Order";
import {OrderService} from "../services/order.service";
import {DataSharingService} from "../services/data-sharing.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-list-orders',
  templateUrl: './list-orders.component.html',
  styleUrls: ['./list-orders.component.css']
})
export class ListOrdersComponent implements OnInit {
  orders! : Order[];

  constructor(private orderService : OrderService, private dataSharingService : DataSharingService, private router : Router) { }

  ngOnInit(): void {
    this.handleGetOrders();
  }


  handleGetOrders() {
    this.orderService.getOrders().subscribe(
      {
        next : value => {
          this.orders = value;
          this.dataSharingService.changeNumberOfOrders(this.orders.length);
        }, error : err => {
          console.log(err.error)
        }
      }
    );
  }

  handleEditOrder(order : Order){
    this.dataSharingService.changeOrder(order);
    this.router.navigateByUrl('listArticles');
  }

}
