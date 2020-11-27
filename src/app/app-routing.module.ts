import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LogOnComponent } from './log-on/log-on.component'

const routes: Routes = [
  { path: "", component: LogOnComponent }
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