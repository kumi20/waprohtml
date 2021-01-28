import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArtykulyComponent } from './artykuly/artykuly.component';
import { DokumentyMagazynoweComponent } from './dokumenty-magazynowe/dokumenty-magazynowe.component';

import { LogOnComponent } from './log-on/log-on.component';

const routes: Routes = [
  { path: "", component: LogOnComponent },
  { path: "start", loadChildren: () => import ('./start/start.module').then(m => m.StartModule)},
  { path: "faktury",  loadChildren: () => import ('./invoice/invoice.module').then(m => m.InvoceModule)},
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