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
import { NestService } from './nest-service.service'

import { UserIdleModule } from 'angular-user-idle';
import { LogOnComponent } from './log-on/log-on.component';
import { HeaderComponent } from './header/header.component';
import { HotkeyListenerDirective } from './hotkey-listener.directive';
import { ArtykulyComponent } from './artykuly/artykuly.component';
import { DxTextAreaModule } from 'devextreme-angular';

@NgModule({
  declarations: [
    AppComponent,
    LogOnComponent,
    HeaderComponent,
    HotkeyListenerDirective,
    ArtykulyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DxButtonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DxTextAreaModule,
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
  providers: [AppServices, PushNotificationService, NestService],
  bootstrap: [AppComponent]
})
export class AppModule { }


export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
