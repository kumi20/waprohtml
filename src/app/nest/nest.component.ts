import { Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ArtykulyComponent } from '../artykuly/artykuly.component';
import { DokumentyMagazynoweComponent } from '../dokumenty-magazynowe/dokumenty-magazynowe.component';
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

  breakNest: boolean = false;

  runInsideNest(operations: Operation[]){
    return new Promise<boolean>(async resolve => {
      for(const operation of operations){
        if(this.breakNest){
          this.breakNest = false;
          break;
        } 

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
          case 'koniec':
            this.breakNest = true;
            await this.runNestMessage(operation);
            console.log('globals after end', this.nestParameters)
            break;
            // 
          case 'formularz_tabeli':
            await this.runNestTableForm(operation);
            console.log('globals after end', this.nestParameters)
            break;
          case 'if_then_else':
            await this.runNestIfThenElse(operation);
            console.log('globals after if then else', this.nestParameters)
            break;
          case 'kartoteka':
            await this.runNestKartoteka(operation);
            console.log('globals after kartoteka', this.nestParameters)
            break;
          default:
            console.log('undefined operation');
            break;
        }
      }
      resolve(true);
    })
  }

  runNest(nest: Nest){
    return new Promise<boolean>(async resolve=>{
      for(const operation of nest.operations){
        if(this.breakNest){
          this.breakNest = false;
          break;
        } 

        console.log(operation)
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
          case 'koniec':
            this.breakNest = true;
            await this.runNestMessage(operation);
            console.log('globals after end', this.nestParameters)
            break;
            // 
          case 'formularz_tabeli':
            await this.runNestTableForm(operation);
            console.log('globals after end', this.nestParameters)
            break;
          case 'if_then_else':
            await this.runNestIfThenElse(operation);
            console.log('globals after if then else', this.nestParameters)
            break;
          case 'kartoteka':
            await this.runNestKartoteka(operation);
            console.log('globals after kartoteka', this.nestParameters)
            break;
          default:
            console.log('undefined operation');
            break;
        }
      }
      resolve(true);
    })
  }

  component: any = [
    { name: 'artykuly', component: ArtykulyComponent },
    { name: 'Dokumenty Magazynowe', component: DokumentyMagazynoweComponent },
  ];

  kartotekaComponent: any;
  kartotekaPopupVisible: boolean = false;
  kartotekaSubject = new BehaviorSubject(false);
  kartotekaSubscription;
  kartotekaExtraData = {};

  closekartotekaPopup(){
    this.kartotekaPopupVisible = false;
    this.kartotekaSubject.next(true)
  }

  runNestKartoteka(operation: Operation){
    let inputs = []
    let outputs = []
    let kartoteka: string = null
    let execType: string = operation.execType;
    operation.operationParameters.forEach(parameter=>{
      if(parameter.name === 'kartotekaName'){
        kartoteka = parameter.value
      }
      if(parameter.input){
        let val = parameter.useGlobals ? this.findInGlobals(parameter.name) : parameter.value;
        inputs.push(val)
        //question = question.replaceAll(parameter.name,val);
      }else if(parameter.output){
        outputs[parameter.name] = null
      }
    })
    return new Promise<boolean>(resolve=>{
      this.kartotekaComponent = this.component.find(comp=>comp.name === kartoteka).component
      this.kartotekaExtraData = {'execType': execType};
      this.kartotekaPopupVisible = true;
      this.kartotekaSubscription = this.kartotekaSubject.subscribe(sub=>{
        if(sub){
          this.kartotekaSubscription.unsubscribe()
          this.kartotekaSubject.next(false)
          resolve(true)
        }
      })
    })
  }

  runNestIfThenElse(operation: Operation){
    console.log(operation)
    let inputs = []
    let outputs = []
    operation.operationParameters.forEach(parameter=>{
      if(parameter.input){
        let obj = {}
        let val = parameter.useGlobals ? this.findInGlobals(parameter.name) : parameter.value;
        obj[parameter.name] = val;
        inputs.push(obj)
        //question = question.replaceAll(parameter.name,val);
      }else if(parameter.output){
        outputs[parameter.name] = null
      }
    })

    console.log(inputs);
    return new Promise<boolean>(async resolve=>{
      //if(operation)
      let result: boolean = true;
      for(let param of inputs){
        for(let par in param){
          if(!param[par]) result = false
        }
      }
      if(result){
        await this.runInsideNest(operation.positivePath)
      }else{
        await this.runInsideNest(operation.negativePath)
      }
      resolve(true);
    })
  }

  externalTableData;
  externalTableExecRights: boolean = false;
  externalTablePopupVisible: boolean = false;
  externalTableSubject = new BehaviorSubject(false);
  externalTableSubscription;

  externalTableFormStructure
  externalTableFormSubject = new BehaviorSubject(false)
  externalTableFormPopupVisible
  externalTableFormSubscription

  runNestTableForm(operation: Operation){
    let tableName: string = null
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
      this.nestService.getHttp( "tableStructures?name="+ tableName).subscribe(res=>{
        console.log(res)
        this.externalTableFormStructure = res[0].structure
        this.externalTableFormPopupVisible = true;
        this.externalTableFormSubscription = this.externalTableFormSubject.subscribe(sub=>{
          if(sub){
            this.externalTableFormSubscription.unsubscribe()
            this.externalTableFormSubject.next(false)
            resolve(true)
          }
        })
      })
    })
  }

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
      this.nestService.getHttp(tableName).subscribe(res=>{
        this.externalTableData = res
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

  prepareSaveFormData(): Object{
    const obj: Object = {};
    for(let data of this.externalTableFormStructure){
      obj[data.colName] = data.value
    }
    obj['id'] = new Date().getTime()
    return obj
  }

  saveTableForm(){
    this.nestService.post(`tabelaDodatkowa`,this.prepareSaveFormData()).subscribe(res=>{
      // console.log(res)
      if(res){
        this.externalTableFormPopupVisible = false;
        this.externalTableFormSubject.next(true)
      }
    })
  }

  closeQuestionPopup(value: boolean){
    this.questionPopup.instance.hide()
    this.questionSubject.next({visible: true, answer: value})
  }

  closeExternalTableFormPopup(){
    this.externalTableFormPopupVisible = false;
    this.externalTableFormSubject.next(true)
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
    if(this.nestParameters[property] !== undefined){
      return this.nestParameters[property]
    }
    else return 'value not found';
  }
}
