import { AfterViewInit, Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AppServices } from './app-services.service';
import { SwPush } from '@angular/service-worker';
import { PushNotificationService } from './push-notification.service';
import { UserIdleService } from 'angular-user-idle';
import { MatomoInjector, MatomoTracker } from 'ngx-matomo-v9';
import { NavigationEnd, Router } from '@angular/router';
import { delay, filter, skip} from 'rxjs/operators';

declare const statistic: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [MatomoTracker, MatomoInjector]
})
export class AppComponent implements OnInit, AfterViewInit{
  title = 'witamy na stonie';
  productList = [];

  timeSession: number = 60;

  readonly VAPID_PUBLIC_KEY = "BLfO5YRiabfAFvqzmwpKos58YGqvxfPaX3LI6xHQLurEDOZZJJema4MJ0Z7xKtNDmi7uI1xNVsRp-h7__akbEyE"

  constructor(private translate: TranslateService, private appServices: AppServices, private http: HttpClient,
    private swPush: SwPush, private pushService: PushNotificationService, 
    private bnIdle: UserIdleService, private matomoInjector: MatomoInjector,
    private router: Router, private matomoTracker: MatomoTracker){
    translate.setDefaultLang('pl'); 

    this.bnIdle.startWatching(); 
    
    // Start watching when user idle is starting.
    this.bnIdle.onTimerStart().subscribe(() =>{
      this.timeSession --;
    });
    
    // Start watch when time is up.
    this.bnIdle.onTimeout().subscribe(() => console.log('Time is up!'));

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
  
  ngAfterViewInit(){
    this.matomoInjector.init('https://kumi20.webd.pl/matomo/', 1);

    let referrer: string = window.location.href;

    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      skip(1),
      delay(0),
    ).subscribe(next =>{
      console.log('routing', window.location)
      //this.matomoTracker.setCustomUrl('/' +  window.location.hash.substr(1));
      this.matomoTracker.setDocumentTitle(window.location.hash)
     // this.matomoTracker.trackEvent('category', 'action', 'dodanie faktury', 0);
      statistic(window.location.hash.substr(1))
    })
  }

  sendNotification(){
    this.pushService.sendNotification().subscribe();
  }
}