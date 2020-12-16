import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArtykulyComponent } from './artykuly/artykuly.component';
import { DokumentyMagazynoweComponent } from './dokumenty-magazynowe/dokumenty-magazynowe.component';

import { LogOnComponent } from './log-on/log-on.component';
import { StartComponent } from './start/start.component';
import { Test1Component } from './test1/test1.component';
import { Test2Component } from './test2/test2.component';

const routes: Routes = [
  { path: "test1", component: StartComponent, children:[
    { path: "", component: Test1Component, outlet: 'panel' },
  ]},
  { path: "test2", component: StartComponent, children:[
    { path: "", component: Test2Component, outlet: 'panel' },
  ]}  { path: "", component: LogOnComponent },
  { path: 'articles', component: ArtykulyComponent},
  { path: 'documents', component: DokumentyMagazynoweComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    enableTracing: false,
    useHash: true,
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }