import { Component, OnInit } from '@angular/core';
import {TranslateService } from '@ngx-translate/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AppServices } from './app-services.service';
import { SwPush } from '@angular/service-worker';
import { PushNotificationService } from './push-notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'witamy na stonie';
  productList = [];

  readonly VAPID_PUBLIC_KEY = "BLfO5YRiabfAFvqzmwpKos58YGqvxfPaX3LI6xHQLurEDOZZJJema4MJ0Z7xKtNDmi7uI1xNVsRp-h7__akbEyE"

  constructor(private translate: TranslateService, private appServices: AppServices, private http: HttpClient,
    private swPush: SwPush, private pushService: PushNotificationService){
    translate.setDefaultLang('pl'); 
  }
  
  ngOnInit(){
    let promise = Notification.requestPermission();
    if (this.swPush.isEnabled) {
      this.swPush
        .requestSubscription({
          serverPublicKey: this.VAPID_PUBLIC_KEY,
        })
        .then(subscription => {
          this.pushService.sendSubscriptionToTheServer(subscription).subscribe()
        })
        .catch(console.error)
    }
  }
  useLanguage = (language: string) =>{
    localStorage.setItem('lang', language);
    this.translate.use(language)
  }

  sendNotification(){
    this.pushService.sendNotification().subscribe()
  }
}
