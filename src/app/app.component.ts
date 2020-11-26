import { Component } from '@angular/core';
import {TranslateService } from '@ngx-translate/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AppServices } from './app-services.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'witamy na stonie';
  productList = [];

  constructor(private translate: TranslateService, private appServices: AppServices, private http: HttpClient){
    translate.setDefaultLang('pl'); 
  }
  
  useLanguage = (language: string) =>{
    localStorage.setItem('lang', language);
    this.translate.use(language)
  }
}
