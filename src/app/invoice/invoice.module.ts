import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { InvoceComponent } from './invoice/invoice.component';
import { NewInvoceComponent } from './new-invoice/new-invoce.component';

import { routing } from './invoice-routing-module';
import { MenuWaproModule } from '../menu-wapro/menu-wapro.module';

@NgModule({
  declarations: [
    InvoceComponent, 
    NewInvoceComponent
  ],
  imports: [
    MenuWaproModule,
    CommonModule,
    routing
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class InvoceModule { }
