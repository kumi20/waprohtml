import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Nest, NestService, Operation } from '../nest-service.service';

@Component({
  selector: 'app-nest',
  template: '',
})
export class NestComponent implements OnInit {

  @Input() popupVisible: boolean = false;

  operationFinished: Promise<boolean>;
  nestParameters: Object = {}
  nests: Nest[] = [];
  message: string = '';
  subject = new BehaviorSubject(false);
  subscription: Subscription;

  constructor(protected nestService: NestService) { }

  ngOnInit(): void {
  }

  getNests(){
    // przy pobraniu można podzielić gniazda aby nie filtrować ich ponownie 
    //przy wykonywaniu jakiejs operacji jak na poczatku addArticle
    this.nestService.get().subscribe((nests: Nest[])=>{
      this.nests = nests;
    })
  }
  
  getNestGlobals(nest: Nest){
    nest.globalParameters.forEach(parameter=>{
      this.nestParameters[parameter.name] = parameter.value;
    })
  }

  runNest(nest: Nest){
    return new Promise<boolean>(async resolve=>{
      for(const operation of nest.operations){
        switch(operation.type){
          case 'procedura':
            await this.runNestProcedure(operation);
            break;
          case 'komunikat':
            await this.runNestMessage(operation);
            console.log("after close")
            break;
          default:
            console.log('undefined operation');
            break;
        }
      }
      resolve(true);
    })
  }

  runNestMessage(operation: Operation){
    console.log('globals before message', this.nestParameters)
    let message: string | any = ''
    operation.operationParameters.forEach(parameter=>{
      if(parameter.name === 'tresc'){
        message = parameter.value
      }
      else if(parameter.input){
        let val = parameter.useGlobals ? 'ZNAJDZ_W_GLOBALNYCH_ZMIENNYCH' : parameter.value;
        message = message.replaceAll(parameter.name,val);
      }
    })
    this.message = message;
    this.popupVisible = true;
    return new Promise<boolean>(resolve=>{
      this.subscription = this.subject.subscribe((data:any) => {
        if(data){
          this.subject.next(false)
          this.subscription.unsubscribe()
          resolve(data);
        }
      })
    })
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

    return new Promise<any>(async (resolve)=>{
      console.log('inputs to procedure, ',inputs)
      let response = await this.nestService.nestSQLProcedure(sqlProcedure,inputs,outputs)
      
      this.updateGlobals(response);
      console.log('globals after SQLPRocedure', this.nestParameters)
      resolve(true)
    })
  }

  updateGlobals(outputs: any[]){
    for(const res of outputs){
      for(const p in res){
        this.nestParameters[p] =res[p]
      }
    }
  }
  
  closePopup($event){
    this.subject.next(true)
  }
}
