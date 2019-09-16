/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';

import { EsignRoutingModule } from './esign-routing.module';

import { EsignMainPageComponent } from './main-page/esign-main.page.component';

import { NavigationBarComponent } from './parts/esign-nav-bar.component';
import { ESignGridComponent } from './parts/esign-grid.component';
import { ESignatureComponent } from './parts/signature.component';

import { ESignLogComponent } from './parts/esign-log.component';
import { ESignDocumentViewerComponent } from './parts/esign-document-viewer.component';
import { ESignDocumentsSearchComponent } from './parts/esign-documents-search.component';

import { ESignService } from './services/esign.service';

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({

  imports: [
    EsignRoutingModule,
    SharedModule,
    CoreModule,
    CommonModule,
    FormsModule
  ],

  providers: [ESignService],

  declarations: [
    EsignMainPageComponent,
    NavigationBarComponent,
    ESignGridComponent,
    ESignatureComponent,
    ESignLogComponent,
    ESignDocumentViewerComponent,
    ESignDocumentsSearchComponent
  ],

  exports: [EsignMainPageComponent]
})

export class EsignModule { }
