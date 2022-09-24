import { Component, OnInit } from '@angular/core';
import {DataSharingService} from "../services/data-sharing.service";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  ordersNumber : number = 0;
  constructor(private dataSharingService : DataSharingService) { }

  ngOnInit(): void {
    this.dataSharingService.currentOrderNumbers.subscribe(orderNb => {
      this.ordersNumber = orderNb;
    });
  }

}
