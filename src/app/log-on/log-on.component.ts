import { Component, OnDestroy, OnInit, SystemJsNgModuleLoader, HostListener } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AppServices } from '../app-services.service';
import { TranslateService } from '@ngx-translate/core'

import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../event.service';
import * as sha512 from 'js-sha512';

@Component({
  selector: 'app-log-on',
  templateUrl: './log-on.component.html',
  styleUrls: ['./log-on.component.scss'],
})
export class LogOnComponent implements OnInit, OnDestroy {

  logForm;
  mode: string = 'password'
  // jwtHelper: JwtHelper = new JwtHelper();

  formError = {
    login: "",
    password: "",
  };

  validationMessages = {
    login: {
      required: this.translate.instant('logOn.password')
    },
    password: {
      required: "Hasło jest wymagane"
    }
  };

  submitted: boolean = false;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
     if (window.innerWidth < 376) {
      document.body.style.background = "url('./assets/img/mobile_kv.svg') no-repeat 185px 0px";
    }
    else document.body.style.background = "url('./assets/img/top_small.png') no-repeat 0 0, url('./assets/img/background.png') no-repeat 370px -90px";
  }


  constructor(private translate: TranslateService, public formBuilder: FormBuilder, private appService: AppServices, private route: ActivatedRoute, public _route: Router, private event: EventService) {
    this.onCreateForm();
  }

  ngOnInit() {
    this.translate.get('logOn.login-required').subscribe( (text: string) => {
      console.log('asdf')
      this.validationMessages.login.required = text;
    });

    if (window.innerWidth < 376) {
      document.body.style.background = "url('./assets/img/mobile_kv.svg') no-repeat 185px 0px";
    }
    else document.body.style.background = "url('./assets/img/top_small.png') no-repeat 0 0, url('./assets/img/background.png') no-repeat 370px -90px";


    this.logForm.valueChanges.subscribe(value => {
      this.event.onControlValueChanged(
        this.logForm,
        this.formError,
        this.validationMessages
      );
    });    
  }

  test(){
    this.validationMessages.login.required = this.translate.instant('logOn.password')
    console.log(this.translate.instant('logOn.password'))
  }


  ngOnDestroy() {
    document.body.style.background = "none";
  }

  onCreateForm() {
    this.logForm = this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  clearValue = (controls) => {
    if(controls === 'password') this.logForm.controls.password.setValue('');
    else this.logForm.controls.login.setValue('');    
  }

  onSubmitForm(event) {
    localStorage.removeItem('wapro-erp-token');
    this.submitted = true;
    if (this.logForm.invalid) {
      this.event.onControlValueChanged(
        this.logForm,
        this.formError,
        this.validationMessages
      );
      return false;
    } else {

    }
  }

  hexToBase64(str) {
    return btoa(String.fromCharCode.apply(null,
      str.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" "))
    );
  }  
}

