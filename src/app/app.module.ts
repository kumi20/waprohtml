import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { HttpClient, HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { DxButtonModule } from 'devextreme-angular/ui/button';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


import { AppServices } from './app-services.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { PushNotificationService } from './push-notification.service';

import { UserIdleModule } from 'angular-user-idle';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DxButtonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader:{
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    UserIdleModule.forRoot({idle: 10, timeout: 60, ping: 120})
  ],
  providers: [AppServices, PushNotificationService],
  bootstrap: [AppComponent]
})
export class AppModule { }


export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
