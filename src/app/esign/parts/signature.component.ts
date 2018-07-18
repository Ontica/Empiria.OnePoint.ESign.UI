/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, EventEmitter, HostBinding,
         Input, Output } from '@angular/core';

import { EsignService } from '../services/esign.service';
import { SpinnerService } from '@app/core/ui-services';


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
        case 'revoke' : this.revoke(); break;
    }
}

// Private methods

private setCommandDescriptionLabel(): void {

    switch(this.commandName) {
      case 'sign' : this.commandDescriptionLabel =  'Firmar';  break;
      case 'revoke' :  this.commandDescriptionLabel = 'Revocar firma'; break;
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


private async revoke() {
    const errMsg = 'Ocurrió un problema al intentar revocar las firmas.';
    const  credentials = { password: this.password };

    this.spinnerService.show();

    await this.esignService.revoke(credentials, this.signRequests)
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
