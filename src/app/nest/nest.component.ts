import { Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Nest, NestService, Operation } from '../nest-service.service';

export interface QuestionPromise{
  visible: boolean,
  answer: boolean
}
@Component({
  selector: 'app-nest',
  template: '',
})
export class NestComponent implements OnInit {

  @ViewChild('questionPopup') questionPopup: any;
  popupVisible: boolean = false;
  questionPopupVisible: boolean = false;
  
  operationFinished: Promise<boolean>;
  questionResolved: Promise<QuestionPromise>;
  nestParameters: Object = {}
  nests: Nest[] = [];
  message: string = '';
  questionMessage: string = '';
  subject = new BehaviorSubject(false);
  questionSubject = new BehaviorSubject({});
  subscription: Subscription;
  questionSubscription: Subscription;

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
            console.log('globals after message', this.nestParameters)
            break;
          case 'pytanie':
            await this.runNestQuestion(operation);
            console.log('globals after question', this.nestParameters)
            break;
          case 'tabela_dodatkowa':
            await this.runExternalTable(operation);
            console.log('globals after external table', this.nestParameters)
            break;
          default:
            console.log('undefined operation');
            break;
        }
      }
      resolve(true);
    })
  }

  externalTableData;
  externalTableExecRights: boolean = false;
  externalTablePopupVisible: boolean = false;
  externalTableSubject = new BehaviorSubject(false);
  externalTableSubscription;

  runExternalTable(operation: Operation){
    let tableName: string = null
    //let execType: string = operation.execType;
    this.externalTableExecRights = (operation.execType === "full") ? true : false;
    operation.operationParameters.forEach(parameter=>{
      if(parameter.name === 'tableName'){
        tableName = parameter.value
      }
      else if(parameter.input){
        let val = parameter.useGlobals ? this.findInGlobals(parameter.name) : parameter.value;
        //question = question.replaceAll(parameter.name,val);
      }
    })

    return new Promise<boolean>(resolve=>{
      this.nestService.getHttp( "tableData?name="+ tableName).subscribe(res=>{
        this.externalTableData = res[0].data
        this.externalTablePopupVisible = true;
        this.externalTableSubscription = this.externalTableSubject.subscribe(sub=>{
          if(sub){
            this.externalTableSubscription.unsubscribe()
            this.externalTableSubject.next(false)
            resolve(true)
          }
        })
      })
    })
  }

  runNestQuestion(operation: Operation){
    console.log('globals before question', this.nestParameters)
    let question: string | any = ''
    let outputs: any[] = []
    operation.operationParameters.forEach(parameter=>{
      if(parameter.name === 'tresc'){
        question = parameter.value
      }
      else if(parameter.input){
        let val = parameter.useGlobals ? this.findInGlobals(parameter.name) : parameter.value;
        question = question.replaceAll(parameter.name,val);
      }if(parameter.output){
        let obj = {}
        obj[parameter.name] = null;
        outputs.push(obj)
      }
    })
    this.questionMessage = question;
    this.questionPopupVisible = true;

    return new Promise<{}>(resolve=>{
      this.questionSubscription = this.questionSubject.subscribe((data: QuestionPromise) => {
        if(data.visible){
          this.questionSubscription.unsubscribe()
          // aktualizacja outputow z udzielonej odpowiedzi
          outputs.forEach((param: {})=>{
            for(let p in param){
              param[p] = data.answer
            }
          })
          this.updateGlobals(outputs)
          this.questionSubject.next({visible: false, answer: null})
          resolve(data);
        }
      })
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
        let val = parameter.useGlobals ? this.findInGlobals(parameter.name) : parameter.value;
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

  closeQuestionPopup(value: boolean){
    this.questionPopup.instance.hide()
    this.questionSubject.next({visible: true, answer: value})
  }

  closeExternalTablePopup(){
    this.externalTablePopupVisible = false;
    this.externalTableSubject.next(true)
  }

  runNestProcedure(operation: Operation){
    console.log('globals before SQLPRocedure', this.nestParameters)
    let sqlProcedure = ''
    let inputs: any[] = []
    let outputs: any[] = []
    operation.operationParameters.forEach(parameter=>{
      if(parameter.name === 'sqlProcedure'){
        sqlProcedure = parameter.value
      }
      else if(parameter.input){
        let obj = {}
        obj[parameter.name] = parameter.useGlobals ? this.findInGlobals(parameter.name) : parameter.value;
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

  findNest(code: string,time: string): Nest{
    return this.nests.find(nest=>nest.code === code && nest.time === time)
  }

  findInGlobals(property: string){
    return this.nestParameters[property] || 'value not found';
  }
}
