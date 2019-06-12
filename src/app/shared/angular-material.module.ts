/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({

  imports: [
    MatButtonModule,
    MatDialogModule
  ],

  exports: [
    MatButtonModule,
    MatDialogModule
  ],
})
export class AngularMaterialModule { }
