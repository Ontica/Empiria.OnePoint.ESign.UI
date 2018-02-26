/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

import { EsignRoutingModule } from './esign-routing.module';;

import { EsignMainPageComponent } from './main-page/esign-main.page.component';

import { EsignNavBarComponent } from './parts/esign-nav-bar.component';
import { EsignGridComponent } from './parts/esign-grid.component';
import { SignatureComponent } from './parts/signature.component'

import { EsignLogComponent } from './parts/esign-log.component';
import { EsignDocumentViewerComponent } from './parts/esign-document-viewer.component';
import { EsignDocumentsSearchComponent } from './parts/esign-documents-search.component';

import { EsignService } from './services/esign.service';

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [EsignRoutingModule, SharedModule, CommonModule, FormsModule],
  providers: [EsignService],
  declarations: [EsignMainPageComponent,  EsignNavBarComponent, EsignGridComponent, SignatureComponent,
                 EsignLogComponent, EsignDocumentViewerComponent, EsignDocumentsSearchComponent],
  exports: [EsignMainPageComponent]
})  
export class EsignModule { }
