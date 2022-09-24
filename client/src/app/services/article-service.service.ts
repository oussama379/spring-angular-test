import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Article} from "../Models/Article";
import {environment} from "../../environments/environment";
import {Order} from "../Models/Order";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http : HttpClient) { }


  addArticle(article : Article) : Observable<Article>{
    let formData: FormData = new FormData();
    formData.append("name", article.name);
    formData.append("price", article.price);
    formData.append("pictureIn", article.picture);
    return this.http.post<Article>(environment.backendUrl + '/article', formData);
  }

  getArticles(): Observable<any> {
    return this.http.get<any>(environment.backendUrl + '/article');
  }

  getArticleById(id : number): Observable<Article> {
    return this.http.get<Article>(environment.backendUrl + '/article/' + id);
  }

}
