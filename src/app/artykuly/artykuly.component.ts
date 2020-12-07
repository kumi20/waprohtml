import { Component, OnInit } from '@angular/core';
import { Nest, NestService, Operation } from '../nest-service.service';

@Component({
  selector: 'app-artykuly',
  templateUrl: './artykuly.component.html',
  styleUrls: ['./artykuly.component.scss']
})
export class ArtykulyComponent implements OnInit {

  nestParameters: Object = {

  }
  nests: Nest[] = [];
  
  constructor(private nestService: NestService) {

  }

  ngOnInit(): void {
    this.nestService.get().subscribe((nests: Nest[])=>{
      this.nests = nests;
      // przy pobraniu można podzielić gniazda aby nie filtrować ich ponownie 
      //przy wykonywaniu jakiejs operacji jak na poczatku addArticle
    })
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

  getNestGlobals(nest: Nest){
    nest.globalParameters.forEach(parameter=>{
      this.nestParameters[parameter.name] = parameter.value;
    })
  }

  runNest(nest: Nest){
    nest.operations.forEach((operation: Operation)=>{
      switch(operation.type){
        case 'procedura':
          this.runNestProcedure(operation);
          break;
        case 'komunikat':
          this.runNestMessage(operation);
          break;
        default:
          console.log('undefined operation');
          break;
      }
    })
  }

  runNestMessage(operation: Operation){
    console.log('globals before message', this.nestParameters)
    let message: string = ''
    operation.operationParameters.forEach(parameter=>{
      if(parameter.name === 'tresc'){
        message = parameter.value
      }
      else if(parameter.input){
        let val = parameter.useGlobals ? 'ZNAJDZ_W_GLOBALNYCH_ZMIENNYCH' : parameter.value;
        message = message.replaceAll(parameter.name,val);
      }
    })
    console.log(message);
  }

  runNestProcedure(operation: Operation){
    console.log('globals before SQLPRocedure', this.nestParameters)
    let sqlProcedure = ''
    let inputs: any[] = []
    let outputs: any[] = []
    operation.operationParameters.forEach(parameter=>{
      if(parameter.name === 'sqlProc'){
        sqlProcedure = parameter.value
      }
      else if(parameter.input){
        let obj = {}
        obj[parameter.name] = parameter.useGlobals ? 'ZNAJDZ_W_GLOBALNYCH_ZMIENNYCH' : parameter.value;
        inputs.push(obj)
      }
      if(parameter.output){
        let obj = {}
        obj[parameter.name] = null;
        outputs.push(obj)
      }
    })
    console.log('inputs to procedure, ',inputs)
    let response = this.nestService.nestSQLProcedure(sqlProcedure,inputs,outputs)
    
    this.updateGlobals(response);
    console.log('globals after SQLPRocedure', this.nestParameters)
  }

  updateGlobals(outputs: any[]){
    outputs.forEach(res=>{
      for(let p in res){
        this.nestParameters[p] = res[p]
      }
    })
  }

}