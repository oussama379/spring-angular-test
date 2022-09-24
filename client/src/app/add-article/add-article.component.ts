import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {ArticleService} from "../services/article-service.service";
import {Article} from "../Models/Article";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css']
})
export class AddArticleComponent implements OnInit {
  articleFormGroup! : FormGroup;
  image! : File;
  constructor(private fb : FormBuilder, private articleService : ArticleService, private router : Router) { }

  ngOnInit(): void {
    this.articleFormGroup = this.fb.group({
      name : this.fb.control(null, [Validators.required, Validators.minLength(5)]),
      price : this.fb.control(null, [Validators.required]),
      picture : this.fb.control(null, [Validators.required]),
    });
  }

  onImageSelected($event : any) {
    this.image = $event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(this.image);
  }



  handleAddArticle() {
    let article : Article = this.articleFormGroup.value;
    article.picture = this.image;
    this.articleService.addArticle(article).subscribe(
      {
        next : value => {
          alert('Article added successfully')
          this.router.navigateByUrl('/listArticles');
        },
        error : err => {
          alert('Something went wrong, Try again')
        }
      }
    );
  }

  getErrorMessage(name: string, errors: ValidationErrors) : string{
    if(errors['required'])
      return name + ' is required';
    if(errors['minlength'])
      return name + ' should have at least '+errors['minlength']['requiredLength']+' Characters';
    return '';
  }
}
