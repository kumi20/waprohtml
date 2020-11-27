import { Injectable } from "@angular/core";
import { DatePipe } from '@angular/common';
import { AppServices } from './app-services.service'
import { Subject, BehaviorSubject } from 'rxjs';

import {TranslateService } from '@ngx-translate/core';

import * as CryptoJS from 'crypto-js';

import { Router } from '@angular/router';

const salt = "%CxR$%j$i9^2:9_0*2Q!230xs.+";

@Injectable({
  providedIn: "root",
})
export class EventService {

  public constructor(private translate: TranslateService, public AppServices: AppServices, private _route: Router) {
  }

  onControlValueChanged(from, formErrors, validationMsg) {
    const form = from;
    for (let field in formErrors) {
      
      formErrors[field] = "";
      let control = form.get(field);
      const validationMessages = validationMsg[field];
      for (const key in control.errors) {
        formErrors[field] += validationMessages[key] + " ";
      }
    }
  }

  useLanguage = (language: string) =>{
    localStorage.setItem('lang', language);
    this.translate.use(language)
  }

  //szyfruje JSON do AES, aby dane w localstorage czy sessionstorage nie byly przechowywane jawnie
  encryptString = (strignToEncrypt) => {
    return CryptoJS.AES.encrypt(JSON.stringify(JSON.stringify(strignToEncrypt)), salt).toString();
  }

  //funkcja odszysfrowuje dane AES
  decryptString = (stringToDecrypt) => {
    stringToDecrypt = CryptoJS.AES.decrypt(stringToDecrypt, salt);
    if (stringToDecrypt.toString()) {
      let pom = JSON.parse(stringToDecrypt.toString(CryptoJS.enc.Utf8));
      return JSON.parse(stringToDecrypt.toString(CryptoJS.enc.Utf8));
    }
  }

  public showNotification(type: string, message: string): void {
    let msg = { type: type, message: message };
  }

  dataFormatted(params) {
    return new DatePipe('en-US').transform(params.value, 'yyyy-MM-dd');
  }
}