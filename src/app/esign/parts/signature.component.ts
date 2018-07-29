/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';

import { EsignService } from '../services/esign.service';
import { SpinnerService } from '@app/core/ui-services';


@Component({
  selector: 'signature',
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

  @Output() onCloseEvent = new EventEmitter();
  @Output() onSave = new EventEmitter();

  password = '';
  commandDescriptionLabel = '';

  constructor(private esignService: EsignService,
              private spinnerService: SpinnerService) {}


  cancel(): void {
    this.onClose();
  }


  doCommand(): void {
    if (!this.validateCredentials()) {
      return;
    }

    switch (this.commandName) {
      case 'sign': this.sign(); break;
      case 'revoke': this.revoke(); break;
    }
  }


  onClose(): void {
    this.onCloseEvent.emit();
  }


  // Private methods

  private async revoke() {
    const credentials = { password: this.password };

    this.spinnerService.show();

    await this.esignService.revoke(credentials, this.signRequests)
      .subscribe((x) => { this.onSave.emit() },
        () => { },
        () => { this.spinnerService.hide(); });
  }


  private setCommandDescriptionLabel(): void {
    switch (this.commandName) {
      case 'sign':
        this.commandDescriptionLabel = 'Firmar';
        break;
      case 'revoke':
        this.commandDescriptionLabel = 'Revocar firma';
        break;
    }
  }


  private async sign() {
    const credentials = { password: this.password };

    this.spinnerService.show();

    await this.esignService.sign(credentials, this.signRequests)
      .subscribe((x) => { this.onSave.emit() },
        () => { },
        () => { this.spinnerService.hide(); });
  }


  private validateCredentials(): boolean {
    if (this.password === '') {
      alert("Necesito se proporcione la contraseña asociada a la firma electrónica.");
      return false;
    }

    return true;
  }

}
