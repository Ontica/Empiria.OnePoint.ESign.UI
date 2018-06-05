/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { Component, Input, Output, EventEmitter } from '@angular/core';

import { EsignService } from '../services/esign.service';
import { SpinnerService } from '../../shared/spinner/spinner.service';

import { SignRequest } from '../data-types/signRequest';

@Component({
    selector:'documents-search',
    templateUrl: './esign-documents-search.component.html',
    styleUrls: ['./esign-documents-search.component.scss']    
})

export class EsignDocumentsSearchComponent  {
   
    public signRequests: SignRequest[];
    public keywords = '';
    public selectedSignRequests :string[] = [];
   
    public commandName = '';
    public isCommandWindowVisible = false;    
    public selectedSignRequestUID = '';
        
    @Output() public onDisplayDocument = new EventEmitter<string>();   

    constructor (private esignService: EsignService, private spinnerService: SpinnerService){}         
          
    public setCommandInfo(commandName: string, signRequestUID: string): void {
        this.selectedSignRequests = [];
        this.selectedSignRequests.push(signRequestUID);

        this.commandName = commandName;

        this.isCommandWindowVisible = true;         
    }

    public closeCommandWindow(): void {
        this.isCommandWindowVisible = false;
    }

    public updateDocuments(): void {
        this.closeCommandWindow();
        
        this.search();     
    }    

    public openDocumentViewer(signRequest: SignRequest) {                           
        
        this.onDisplayDocument.emit(signRequest.document.uri);           
    }           
   
    public search(): void {

        if (this.keywords === '') {
            return;
        }

        this.spinnerService.show();

        this.esignService.search(this.keywords)
            .subscribe((signRequests) => { this.signRequests = signRequests; console.log(this.signRequests) },
                        () => {},
                        () => { this.spinnerService.hide(); });          
    }    

}
