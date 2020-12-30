/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, Input, Output, EventEmitter } from '@angular/core';

import { ESignService } from '../services/esign.service';
import { SpinnerService } from '@app/core/ui-services';

import { SignRequest } from '../data-types/signRequest';


@Component({
  selector: 'emp-one-esign-grid',
  templateUrl: './esign-grid.component.html',
  styleUrls: ['./esign-grid.component.scss']
})
export class ESignGridComponent {

  signRequests: SignRequest[];
  selectedSignRequests: string[] = [];
  commandName = '';
  isCommandWindowVisible = false;
  selectedSignRequestUID = '';
  isDocumentSelected = false;
  isSignRequest = false;

  @Output() displayDocument = new EventEmitter<string>();

  private documentTypeValue = '';
  @Input()
  set documentType(documentType: string) {

    this.documentTypeValue = documentType;

    this.signRequests = [];
    this.selectedSignRequests = [];
    this.selectedSignRequestUID = '';
    this.commandName = '';

    this.loadDocuments();
  }
  get documentType(): string {
    return this.documentTypeValue;
  }

  constructor(private esignService: ESignService,
              private spinnerService: SpinnerService) { }


  closeCommandWindow(): void {
    this.isCommandWindowVisible = false;
  }


  loadDocuments(): void {
    switch (this.documentType) {
      case 'pendingDocuments':
        this.loadPendingDocuments();
        break;

      case 'revokedDocuments':
        this.loadRevokedDocuments();
        break;

    }

    this.cleanSelectedRequests();
  }

  onChangeSelectedDocument(): void {
    if (this.isDocumentSelected) {
      this.onSelectAllDocuments();
    } else {
      this.onUnSelectAllDocuments();
    }

  }

  onChangeSignRequest(signRequest: SignRequest) {
    if (this.isSignRequest) {
      this.onSelectDocument(signRequest)
    } else {
      this.onUnselectDocument(signRequest)
    }

  }

  onSelectAllDocuments(): void {
    this.signRequests.forEach((document) => {
      document.selected = true;
    });
  }


  onSelectDocument(signRequest: SignRequest): void {
    const selectedDocumentIndex = this.signRequests.findIndex((x) => x.uid === signRequest.uid);

    this.signRequests[selectedDocumentIndex].selected = true;
  }


  onUnSelectAllDocuments(): void {
    this.signRequests.forEach((document) => {
      document.selected = false;
    });
  }


  onUnselectDocument(signRequest: SignRequest): void {
    const selectedDocumentIndex = this.signRequests.findIndex((x) => x.uid === signRequest.uid);

    this.signRequests[selectedDocumentIndex].selected = false;
  }


  openDocumentViewer(signRequest: SignRequest) {
    this.selectedSignRequestUID = signRequest.uid;

    this.displayDocument.emit(signRequest.document.uri);
  }


  setCommandName(commandName: string): void {
    this.setSelectedDocuments();

    if (this.selectedSignRequests.length === 0) {
      alert('Requiero se seleccione cuando menos un documento.');
      return;
    }

    this.commandName = commandName;
    this.isCommandWindowVisible = true;
  }


  updateDocuments(): void {
    this.closeCommandWindow();

    this.loadDocuments();
    this.cleanSelectedRequests();
  }


  // Private methods

  private cleanSelectedRequests(): void {
    this.selectedSignRequests = [];
  }


  private loadPendingDocuments(): void {
    this.spinnerService.show();

    this.esignService.getPendingDocuments()
      .subscribe((signRequests) => { this.signRequests = signRequests; },
        () => { },
        () => { this.spinnerService.hide(); }
      );
  }


  private loadRevokedDocuments(): void {
    this.spinnerService.show();

    this.esignService.getRevokedDocuments()
      .subscribe((signRequests) => { this.signRequests = signRequests; },
        () => { },
        () => { this.spinnerService.hide(); }
      );
  }


  private setSelectedDocuments(): void {
    this.cleanSelectedRequests();

    this.signRequests.forEach(
      (signRequest) => signRequest.selected ? this.selectedSignRequests.push(signRequest.uid) : ''
    );
  }

}
