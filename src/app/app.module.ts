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

import { AuthCasModModule } from 'auth-cas-mod';

import { UserIdleModule } from 'angular-user-idle';
import { LogOnComponent } from './log-on/log-on.component';
import { HeaderComponent } from './header/header.component';
import { HotkeyListenerDirective } from './hotkey-listener.directive';
import { ArtykulyComponent } from './artykuly/artykuly.component';
import { DxDataGridModule, DxDateBoxModule, DxNumberBoxModule, DxPopupModule, DxSelectBoxModule, DxTextAreaModule, DxTextBoxModule } from 'devextreme-angular';
import { NestComponent } from './nest/nest.component';
import { DokumentyMagazynoweComponent } from './dokumenty-magazynowe/dokumenty-magazynowe.component';
import { DynamicComponentComponent } from './dynamic-component/dynamic-component.component';
import { StartComponent } from './start/start.component';
import { Test1Component } from './test1/test1.component';
import { Test2Component } from './test2/test2.component';

@NgModule({
  declarations: [
    AppComponent,
    LogOnComponent,
    HeaderComponent,
    HotkeyListenerDirective,
    ArtykulyComponent,
    NestComponent,
    DokumentyMagazynoweComponent,
    DynamicComponentComponent,
StartComponent,
    Test1Component,
    Test2Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DxButtonModule,
    FormsModule,
    ReactiveFormsModule,
    DxDataGridModule,
    HttpClientModule,
    DxTextAreaModule,
    DxPopupModule,
    DxTextBoxModule,
    DxNumberBoxModule,
    DxDateBoxModule,
    DxSelectBoxModule,
    TranslateModule.forRoot({
      loader:{
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
    AuthCasModModule.forRoot(environment),
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
