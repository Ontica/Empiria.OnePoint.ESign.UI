/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MainLayoutComponent } from './main-layout/main-layout.component';

import { NoContentComponent } from './no-content/no-content.component';

import { ModalWindowComponent } from './modal-window/modal-window';


@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    FormsModule
  ],

  declarations: [
    MainLayoutComponent,
    NoContentComponent,
    ModalWindowComponent
  ],

  exports: [
    MainLayoutComponent,
    NoContentComponent,
    ModalWindowComponent
  ],

  providers: [

  ]
})
export class SharedModule { }
