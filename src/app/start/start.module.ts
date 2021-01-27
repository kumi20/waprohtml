import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StartRoutingModule } from './start-routing.module';
import { StartComponent } from './start/start.component';

import { MenuWaproModule } from '../menu-wapro/menu-wapro.module';

@NgModule({
  declarations: [
    StartComponent,   
  ],
  imports: [
    MenuWaproModule,
    CommonModule,
    StartRoutingModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class StartModule { }
