/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { Component, EventEmitter, HostBinding,
    Input, Output } from '@angular/core';

import { EsignService } from '../services/esign.service';
import { SpinnerService } from '../../shared/spinner/spinner.service';
import { ModalWindowComponent } from'../../shared/modal-window/modal-window';

@Component({
selector:'signature',
templateUrl: './signature.component.html',
styleUrls: ['./signature.component.scss'],

})

export class SignatureComponent {

@Input() signRequests: string[];
private _commandName = '';
@Input()
 set commandName(commandName) {
    this._commandName = commandName;
    
    this.setCommandDescriptionLabel();    
 }
 get commandName(): string {
    return this._commandName;
 }

@Output() public onCloseEvent = new EventEmitter();
@Output() public onSave = new EventEmitter();

public password = '';
public commandDescriptionLabel = '';

constructor(private esignService: EsignService, private spinnerService: SpinnerService){}

public cancel(): void {
    this.onClose();
}

public onClose(): void {
    this.onCloseEvent.emit();
} 

public doCommand(): void {
    if (!this.validateCredetianls()) {
        return;
    } 
   
    switch(this.commandName) {        
        case 'sign' : this.sign(); break;
        case 'refuse' : this.refuse(); break;
        case 'revoke' : this.revoke(); break;
        case 'unrefuse' : this.unRefuse(); break;          
    }   
}

// Private methods

private setCommandDescriptionLabel(): void {

    switch(this.commandName) {        
        case 'sign' : this.commandDescriptionLabel =  'Firmar';  break;
        case 'refuse' :  this.commandDescriptionLabel ='Rechazar'; break;
        case 'revoke' :  this.commandDescriptionLabel = 'Envíar a pendientes'; break;
        case 'unrefuse' : this.commandDescriptionLabel = 'Envíar a pendientes'; break;          
    } 
}

private async sign() {
    const errMsg = 'Ocurrió un problema al intentar firmar los documentos.';
    const  credentials = { password: this.password };

    this.spinnerService.show();
  
    await this.esignService.sign(credentials, this.signRequests)
                              .subscribe((x) =>  { this.onSave.emit() },
                                () => {},
                                () => { this.spinnerService.hide(); });                                                            
}

private async refuse() {
    const errMsg = 'Ocurrió un problema al intentar rechazar los documentos.';
    const  credentials = { password: this.password };

    this.spinnerService.show();

    await this.esignService.refuse(credentials, this.signRequests)
                              .subscribe((x) => { this.onSave.emit() },
                                () => {},
                                () => { this.spinnerService.hide(); });                                                                                                    
}

private async revoke() {
    const errMsg = 'Ocurrió un problema al intentar regresar a la bandeja de documentos por firmar.';
    const  credentials = { password: this.password };

    this.spinnerService.show();

    await this.esignService.revoke(credentials, this.signRequests)
                              .subscribe((x) => { this.onSave.emit() },
                                () => {},
                                () => { this.spinnerService.hide(); });  
}

private async unRefuse() {
    const errMsg = 'Ocurrió un problema al intentar regresar a la bandeja de documentos por firmar.';
    const  credentials = { password: this.password };

    this.spinnerService.show();

    await this.esignService.unRefuse(credentials, this.signRequests)
                            .subscribe((x) => { this.onSave.emit() },
                                () => {},
                                () => { this.spinnerService.hide(); }); 
}

private validateCredetianls(): boolean {
    if (this.password === '') {
        alert("Necesito se proporcione la contraseña asociada a la firma electrónica.");
        return false;
    }

    return true;
}

}
