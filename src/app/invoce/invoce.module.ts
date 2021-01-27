import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { InvoceComponent } from './invoce/invoce.component';
import { NewInvoceComponent } from './new-invoce/new-invoce.component';

import { routing } from './invoce-routing-module';
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
