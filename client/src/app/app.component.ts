import { Component } from '@angular/core';
import {OrderService} from "./services/order.service";
import {DataSharingService} from "./services/data-sharing.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';


  constructor(private orderService : OrderService, private dataSharingService : DataSharingService) { }



  ngOnInit(): void {
    this.handleGetOrders();
  }


  handleGetOrders() {
    this.orderService.getOrders().subscribe(
      {
        next : value => {
          this.dataSharingService.changeNumberOfOrders(value.length);
        }, error : err => {
        }
      }
    );
  }
}
