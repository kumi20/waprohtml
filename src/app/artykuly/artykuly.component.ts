import { Component, OnInit } from '@angular/core';
import { NestService } from '../nest-service.service';
import { NestComponent } from '../nest/nest.component';

@Component({
  selector: 'app-artykuly',
  templateUrl: './artykuly.component.html',
  styleUrls: ['./artykuly.component.scss']
})
export class ArtykulyComponent extends NestComponent implements OnInit {

  constructor(public nestService: NestService) {
    super(nestService)
  }

  ngOnInit(): void {
    this.getNests()
  }

  getString(){
    return JSON.stringify(this.nests)
  }

  addArticle(){
    this.nests.forEach(nest=>{
      // sprawdzamy gniazda na dodanie artykulu && przed zaladowaniem formularza dodawania artykulu
      if(nest.code === 'XGALYD' && nest.time === 'przed'){ 
        this.getNestGlobals(nest);
        this.runNest(nest);
      }
    })
  }

}