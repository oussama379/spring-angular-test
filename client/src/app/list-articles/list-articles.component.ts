import { Component, OnInit } from '@angular/core';
import {ArticleService} from "../services/article-service.service";
import {Article} from "../Models/Article";
import {FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {Order} from "../Models/Order";
import {v4 as uuidv4} from 'uuid';
import {DatePipe} from "@angular/common";
import {OrderService} from "../services/order.service";
import {ActivePerfRecorder} from "@angular/compiler-cli/src/ngtsc/perf";
import {ActivatedRoute, Router} from "@angular/router";
import {DataSharingService} from "../services/data-sharing.service";

@Component({
  selector: 'app-list-articles',
  templateUrl: './list-articles.component.html',
  styleUrls: ['./list-articles.component.css']
})
export class ListArticlesComponent implements OnInit {
  searchFormGroup! : FormGroup;
  articles! : Article[];
  searchError! : string;
  order : Order = {id : 0, reference : '', date : '', articles : Array<Article>()};
  newOrder : boolean = false;
  isEditOrder : boolean = false;
  isSearch : boolean = false;

  constructor(private articleService : ArticleService, private fb : FormBuilder, private orderService : OrderService, private dataSharingService : DataSharingService, private router : Router) { }

  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      id : this.fb.control(null),
    });
    this.handleGetArticles();
    this.dataSharingService.currentOrder.subscribe(order => {
      if(order.id != 0){
        this.order = order;
        this.isEditOrder = true;
      }
    });

  }
  handleGetArticles (){
    this.searchError = '';
    this.isSearch = false;
    this.articleService.getArticles().subscribe(
      {
        next : value => {
          this.articles = value;
        }, error : err => {
          console.log(err.error)
        }
      }
    );
  }

  handleSearchById(){
    this.isSearch = true;
    this.searchError = '';
    let id = this.searchFormGroup.value.id;
    this.articleService.getArticleById(id).subscribe(
      {
        next : value => {
          this.articles.splice(0);
          this.articles.push(value);
        }, error : err => {
          this.searchError = err.error;
        }
      }
    );
  }

  handleAddToOrder(article : Article){
    const datePipe: DatePipe = new DatePipe('en-US')
    let formattedDate = datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss')
    if(!this.newOrder && !this.isEditOrder){
      this.order.reference = uuidv4();
      this.order.date = formattedDate!.toString();
      this.newOrder = true;
    }
    this.order.articles.push(article);
  }

  handleRemoveFromOrder(article : Article) {
    this.order.articles = this.order.articles.filter(a => a.id != article.id);
  }


  handleSaveOrder() {
    if(this.order.articles.length == 0){
      alert("Your order doesn't contain any articles")
      return ;
    }

    this.orderService.addOrder(this.order).subscribe({
      next : value => {
        this.order = {id : 0, reference : '', date : '', articles : Array<Article>()};
        this.newOrder = false;
        this.router.navigateByUrl('listOrders');
        alert('Order added successfully')

      }, error : err => {
        alert('Something went wrong, Try again')
      }
    });
  }

  handleCancelOrder() {
    this.order = {id : 0, reference : '', date : '', articles : Array<Article>()};
    this.newOrder = false;
  }

  isInOrder(article : Article) : boolean {
    for (let i = 0; i < this.order.articles.length; i++) {
      if(article.id == this.order.articles[i].id) return true;
    }
    return false;
  }


  handleEditOrder() {
    if(this.order.articles.length == 0){
      alert("Your order doesn't contain any articles")
      return ;
    }

    this.orderService.editOrder(this.order).subscribe({
      next : value => {
        this.order = {id : 0, reference : '', date : '', articles : Array<Article>()};
        this.isEditOrder = false;
        this.dataSharingService.changeOrder(this.order);
        alert('Order edited successfully')
      }, error : err => {
        alert('Something went wrong, Try again')
      }
    });
  }

  handleCancelEditOrder() {
    this.order = {id : 0, reference : '', date : '', articles : Array<Article>()};
    this.isEditOrder = false;
  }
}
