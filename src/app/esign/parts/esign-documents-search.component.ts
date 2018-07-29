/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, Input, Output, EventEmitter } from '@angular/core';

import { SpinnerService } from '@app/core/ui-services';

import { EsignService } from '../services/esign.service';
import { SignRequest } from '../data-types/signRequest';


@Component({
  selector: 'documents-search',
  templateUrl: './esign-documents-search.component.html',
  styleUrls: ['./esign-documents-search.component.scss']
})
export class EsignDocumentsSearchComponent {

  signRequests: SignRequest[];
  keywords = '';
  selectedSignRequests: string[] = [];

  commandName = '';
  isCommandWindowVisible = false;
  selectedSignRequestUID = '';

  @Output() onDisplayDocument = new EventEmitter<string>();

  constructor(private esignService: EsignService,
              private spinnerService: SpinnerService) { }


  closeCommandWindow(): void {
    this.isCommandWindowVisible = false;
  }


  openDocumentViewer(signRequest: SignRequest): void {
    this.onDisplayDocument.emit(signRequest.document.uri);
  }


  search(): void {
    if (this.keywords === '') {
      return;
    }

    this.spinnerService.show();

    this.esignService.search(this.keywords)
      .subscribe((signRequests) => { this.signRequests = signRequests; console.log(this.signRequests) },
        () => { },
        () => { this.spinnerService.hide(); });
  }


  setCommandInfo(commandName: string, signRequestUID: string): void {
    this.selectedSignRequests = [];
    this.selectedSignRequests.push(signRequestUID);

    this.commandName = commandName;

    this.isCommandWindowVisible = true;
  }


  updateDocuments(): void {
    this.closeCommandWindow();

    this.search();
  }

}
