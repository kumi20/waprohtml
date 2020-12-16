import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LogOnComponent } from './log-on/log-on.component';
import { StartComponent } from './start/start.component';
import { Test1Component } from './test1/test1.component';
import { Test2Component } from './test2/test2.component';

const routes: Routes = [
  { path: "", component: LogOnComponent},
  { path: "test1", component: StartComponent, children:[
    { path: "", component: Test1Component, outlet: 'panel' },
  ]},
  { path: "test2", component: StartComponent, children:[
    { path: "", component: Test2Component, outlet: 'panel' },
  ]}
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