import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { InvoceComponent } from './invoice/invoice.component';

import { NewInvoceComponent } from './new-invoice/new-invoce.component'

const routes: Routes = [
  { path: '', component: InvoceComponent},
  { path: 'nowa-faktura', component: InvoceComponent, children:[
    { path: '', component: NewInvoceComponent, outlet: 'invoce'}
  ]}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class routing { }