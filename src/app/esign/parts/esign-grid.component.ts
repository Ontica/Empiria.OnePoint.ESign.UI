/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, Input, Output, EventEmitter } from '@angular/core';

import { EsignService } from '../services/esign.service';
import { SpinnerService } from '@app/core/ui-services';

import { SignRequest } from '../data-types/signRequest';
import { forEach } from '@angular/router/src/utils/collection';


@Component({
  selector:'esign-grid',
  templateUrl: './esign-grid.component.html',
  styleUrls: ['./esign-grid.component.scss']
})
export class EsignGridComponent  {

    public signRequests: SignRequest[];
    public selectedSignRequests: string[] = [];
    public commandName = '';
    public isCommandWindowVisible = false;
    public selectedSignRequestUID = '';

    @Output() public onDisplayDocument = new EventEmitter<string>();

    private _documentType = '';
    @Input()
    set documentType(documentType: string) {

        this._documentType = documentType;

        this.signRequests = [];
        this.loadDocuments();
    }
    get documentType(): string {
        return this._documentType;
    }

    constructor (private esignService: EsignService, private spinnerService: SpinnerService){}

    public loadDocuments():  void {
        switch(this.documentType) {
            case 'pendingDocuments' : this.loadPendingDocuments(); break;
            case 'signedDocuments' : this.loadSignedDocuments(); break;
            case 'refusedDocuments' : this.loadRefusedDocuments(); break;
        }

        this.cleanSelectedDocuments();
    }

    public onSelectAllDocuments(): void {
        this.signRequests.forEach((document) => {
            document.selected = true;
        });

    }

    public onUnSelectAllDocuments(): void {
        this.signRequests.forEach((document) => {
            document.selected = false;
        });

    }

    public onSelectDocument(signRequest: SignRequest): void {
        let selectedDocumentIndex = this.signRequests.findIndex((x) => x.uid === signRequest.uid);
        this.signRequests[selectedDocumentIndex].selected = true;

    }

    public onUnselectDocument(signRequest: SignRequest): void {
        let selectedDocumentIndex = this.signRequests.findIndex((x) => x.uid === signRequest.uid);
        this.signRequests[selectedDocumentIndex].selected = false;

    }

    public setCommandName(commandName: string):  void {
        this.setSelectedDocuments();

        if (this.selectedSignRequests.length === 0) {
            alert("Requiero se seleccione cuando menos un documento.");
            return;
        }

        this.commandName = commandName;
        this.isCommandWindowVisible = true;
    }

    public closeCommandWindow(): void {
        this.isCommandWindowVisible = false;
    }

    public updateDocuments(): void {
        this.closeCommandWindow();

        this.loadDocuments();
        this.cleanSelectedDocuments();
    }

    public openDocumentViewer(signRequest: SignRequest) {
         this.selectedSignRequestUID =   signRequest.uid;

        this.onDisplayDocument.emit(signRequest.document.uri);
    }

    private loadPendingDocuments(): void {
        this.spinnerService.show();

        this.esignService.getPendingDocuments()
            .subscribe((signRequests) => { this.signRequests = signRequests; },
                        () => {},
                        () => { this.spinnerService.hide(); });

    }

    private loadSignedDocuments(): void {
        this.spinnerService.show();

        this.esignService.getSignedDocuments()
            .subscribe((signRequests) => { this.signRequests = signRequests; },
                        () => {},
                        () => { this.spinnerService.hide(); });

    }

    private loadRefusedDocuments(): void {
        this.spinnerService.show();

        this.esignService.getRefusedDocuments()
            .subscribe((signRequests) =>{ this.signRequests = signRequests; },
                        () => {},
                        () => { this.spinnerService.hide(); } );

    }

    private setSelectedDocuments(): void {
       this.signRequests.forEach(
            (signRequest) => signRequest.selected === true ? this.selectedSignRequests.push(signRequest.uid) : '' );

    }

    private cleanSelectedDocuments(): void  {
        this.selectedSignRequests = [];
    }

}
