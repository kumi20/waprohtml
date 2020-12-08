import { Component, OnInit } from '@angular/core';
import { NestService } from '../nest-service.service';
import { NestComponent } from '../nest/nest.component';

@Component({
  selector: 'app-artykuly',
  templateUrl: './artykuly.component.html',
  styleUrls: ['./artykuly.component.scss']
})
export class ArtykulyComponent extends NestComponent implements OnInit {

  formVisible: boolean = false;

  constructor(public nestService: NestService) {
    super(nestService)
  }

  ngOnInit(): void {
    this.getNests()
  }

  getString(){
    return JSON.stringify(this.nests)
  }

  async addArticle(){
    for(const nest of this.nests){
      // sprawdzamy gniazda na dodanie artykulu && przed zaladowaniem formularza dodawania artykulu
      if(nest.code === 'XGALYD' && nest.time === 'przed'){ 
        this.getNestGlobals(nest);
        await this.runNest(nest);
      }
    }
    this.formVisible = true;
  }

}