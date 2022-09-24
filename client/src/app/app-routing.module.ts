import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListArticlesComponent} from "./list-articles/list-articles.component";
import {AddArticleComponent} from "./add-article/add-article.component";
import {ListOrdersComponent} from "./list-orders/list-orders.component";

const routes: Routes = [
  {path : "listArticles", component : ListArticlesComponent},
  {path : "addArticle", component : AddArticleComponent},
  {path : "listOrders", component : ListOrdersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
