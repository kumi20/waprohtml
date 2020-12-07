import { Injectable } from '@angular/core';
import { of } from 'rxjs';

export interface Nest{
  place: string // Zdarzenie zwiazane z pojedynczym artykulem/dodawanie artykulu
  code: string // XGALYD
  time: string | boolean // przed/po 0/1
  operations: Array<Operation>
  globalParameters: Array<OperationParameter>
}

export interface Operation{
  type: string // 
  sort: number
  operationParameters: Array<OperationParameter>
  execType?: string // readonly,write,delete, full
  positivePath?: Array<Operation>
  negativePath?: Array<Operation>
}

export interface OperationParameter{
  name: string // wartosci z @ to zmienne dostepne w prestrzeni gniazda
  input?: boolean
  output?: boolean
  value?: any
  // LUB
  type?: string // input/output
  useGlobals?: boolean
}

@Injectable({
  providedIn: 'root'
})
export class NestService {

  constructor() { }

  nest: Array<Nest> = [
    {
      place: 'Zdarzenie zwiazane z pojedynczym artykulem/dodawanie artykulu',
      code: 'XGALYD',
      time: 'przed',
      globalParameters: [
        {
          name: '@wynik1',
          value: 'false'
        },
        {
          name: '@zmienna1',
          value: 0
        },
        {
          name: '@idUser',
          value: 442
        }
      ],
      operations: [
        {
          // PROCEDURA
          type: 'procedura',
          sort: 1,
          operationParameters: [
            {
              name: 'sqlProcedure',
              value: 'p_proceduraSQL_nazwaProcedury'
            },
            {
              name: '@param1',
              input: true,
              output: false,
              value: 'wartosc_wejsciowa'
            },
            {
              name: '@wynik1',
              input: false,
              output: true
            }
          ]
        },
        {
          // KOMUNIKAT
          type: 'komunikat',
          sort: 2,
          operationParameters: [
            {
              name: 'tresc',
              value: 'tresc komunikatu z wartoscia globalna @wynik1 oraz wartoscia wejsciowa @input1'
            },
            {
              name: '@wynik1',
              input: true,
              useGlobals: true
            },
            {
              name: '@input1',
              input: true,
              value: 'wartosc_wejsciowa'
            }
          ]
        },
        {
          // PYTANIE
          type: 'pytanie',
          sort: 3,
          operationParameters: [
            {
              name: 'tresc',
              value: 'tresc pytania z wartoscia wejsciowa @zmienna'
            },
            {
              name: '@zmienna',
              input: true
            },
            {
              name: '@wynik1',
              output: true
            }
          ]
        },
        {
          // TABELA DODATKOWA
          // pobranie z jakiegos miejsca struktury tabeli o nazwie z parametru
          // uniwersalna mozliwosc zapisania/edycji wybranej tabeli
          type: 'tabela_dodatkowa',
          sort: 4,
          execType: 'readOnly',
          operationParameters: [
            {
              name: 'tableName',
              input: true,
              value: 'tabelaDodatkowa'
            },
            {
              // mozliwosc wpisania wczesniejszych uzyskanych wartosci do tabeli dodatkowej
              name: '@wynik1',
              input: true
            }
          ]
        },
        {
          // koniec
          type: 'koniec',
          sort: 5,
          operationParameters: [
            {
              name: 'tresc wylogowania @zmienna1',
              input: true
            },
            {
              name: '@wyloguj', // zmienna definiujaca to, czy nastapi wylogowanie, czy po prostu zakonczy sie dzialanie gniazda
              input: true
            },
            {
              // mozliwosc wpisania wczesniejszych uzyskanych wartosci do tabeli dodatkowej
              name: '@zmienna1',
              input: true
            }
          ]
        },
        {
          // formularz tabeli
          // pobranie z jakiegos miejsca struktury tabeli o nazwie z parametru
          // uniwersalna mozliwosc zapisania/edycji wybranej tabeli
          type: 'formularz_tabeli',
          sort: 6,
          operationParameters: [
            {
              name: 'tableName',
              input: true,
              value: 'tabelaDodatkowa'
            },
            {
              name: 'idRecord',
              input: true,
              value: 12
            },
            {
              // mozliwosc wpisania wczesniejszych uzyskanych wartosci do tabeli dodatkowej
              name: '@zmienna1',
              input: true
            }
          ]
        },
        {
          // if_then_else
          type: 'if_then_else',
          sort: 7,
          operationParameters: [
            {
              name: '@zmienna1',
              input: true,
              value: '',
              useGlobals: true
            },
            {
              name: '@wynik1', // zmienna definiujaca to, czy nastapi wylogowanie, czy po prostu zakonczy sie dzialanie gniazda
              output: true
            }
          ],
          positivePath: [
            {
              // formularz tabeli
              // pobranie z jakiegos miejsca struktury tabeli o nazwie z parametru
              // uniwersalna mozliwosc zapisania/edycji wybranej tabeli
              type: 'formularz_tabeli',
              sort: 1,
              operationParameters: [
                {
                  name: 'tableName',
                  input: true,
                  value: 'tabelaDodatkowa'
                },
                {
                  name: 'idRecord',
                  input: true,
                  value: 12
                },
                {
                  // mozliwosc wpisania wczesniejszych uzyskanych wartosci do tabeli dodatkowej
                  name: '@zmienna1',
                  input: true
                }
              ]
            },
            {
              // koniec
              type: 'koniec',
              sort: 2,
              operationParameters: [
                {
                  name: 'tresc wylogowania @zmienna1',
                  input: true
                },
                {
                  name: '@wyloguj', // zmienna definiujaca to, czy nastapi wylogowanie, czy po prostu zakonczy sie dzialanie gniazda
                  input: true
                },
                {
                  // mozliwosc wpisania wczesniejszych uzyskanych wartosci do tabeli dodatkowej
                  name: '@zmienna1',
                  input: true
                }
              ]
            }
          ],
          negativePath: [
            {
              // formularz tabeli
              // pobranie z jakiegos miejsca struktury tabeli o nazwie z parametru
              // uniwersalna mozliwosc zapisania/edycji wybranej tabeli
              type: 'formularz_tabeli',
              sort: 1,
              operationParameters: [
                {
                  name: 'tableName',
                  input: true,
                  value: 'tabelaDodatkowa'
                },
                {
                  name: 'idRecord',
                  input: true,
                  value: 12
                },
                {
                  // mozliwosc wpisania wczesniejszych uzyskanych wartosci do tabeli dodatkowej
                  name: '@zmienna1',
                  input: true
                }
              ]
            },
            {
              // koniec
              type: 'koniec',
              sort: 2,
              operationParameters: [
                {
                  name: 'tresc wylogowania @zmienna1',
                  input: true
                },
                {
                  name: '@wyloguj', // zmienna definiujaca to, czy nastapi wylogowanie, czy po prostu zakonczy sie dzialanie gniazda
                  input: true
                },
                {
                  // mozliwosc wpisania wczesniejszych uzyskanych wartosci do tabeli dodatkowej
                  name: '@zmienna1',
                  input: true
                }
              ]
            }
          ]
        },
        {
          // kartoteka
          // otwarcie kartoteki poprzez dynamiczny komponent
          // uniwersalna mozliwosc zapisania/edycji wybranej tabeli
          type: 'kartoteka',
          sort: 8,
          execType: 'readOnly',
          operationParameters: [
            {
              name: 'kartotekaName',
              input: true,
              value: 'Artykuły'
            },
            {
              name: 'idUser',
              input: true,
              useGlobals: true
            },
            {
              name: 'idRecord',
              input: true,
              value: 54
            }
          ]
        }
      ]
    }
  ]
  
  get() {
    return of(this.nest);
  }

  nestSQLProcedure(name: string, inputs: any[], outputs: any[]){
    let apiUrl = `http://localhost:3000/${name}`
    // post do wykonania procki
    // this.http.post(apiUrl,inputs).subscribe(res=>{
    //   res.forEach(param=>{
    //     // jezeli jest output o danym kluczu to podmieniamy
    //     outputs[param] = param
    //   })
    // })
    outputs.forEach((param: {})=>{
      for(let p in param){
        param[p] = 'zwroconyWynik'
      }
    })
    return outputs;
  }
}
