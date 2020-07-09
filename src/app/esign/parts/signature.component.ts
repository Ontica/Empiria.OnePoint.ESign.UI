/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ESignService } from '../services/esign.service';

import { SpinnerService } from '@app/core/ui-services';


@Component({
  selector: 'emp-one-esign-signature',
  templateUrl: './signature.component.html',
  styleUrls: ['./signature.component.scss'],
})
export class ESignatureComponent {

  @Input() signRequests: string[];

  signerName = 'Lic. Elida Garrido Maldonado';

  private commandNameValue = '';
  @Input()
  set commandName(commandName) {
    this.commandNameValue = commandName;

    this.setCommandDescriptionLabel();
  }
  get commandName(): string {
    return this.commandNameValue;
  }

  @Output() closeWindow = new EventEmitter();
  @Output() save = new EventEmitter();

  password = '';
  commandDescriptionLabel = '';

  constructor(private esignService: ESignService,
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
    this.closeWindow.emit();
  }


  // Private methods

  private async revoke() {
    const credentials = { password: this.password };

    this.spinnerService.show();

    await this.esignService.revoke(credentials, this.signRequests)
      .subscribe(x => this.save.emit(),
        () => alert('La contraseña proporcionada no coincide con la asociada a la firma electrónica.'),
        () => this.spinnerService.hide()
      );
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
      .subscribe(x => this.save.emit(),
        () => alert('La contraseña proporcionada no coincide con la asociada a la firma electrónica.'),
        () => this.spinnerService.hide()
      );
  }


  private validateCredentials(): boolean {
    if (this.password === '') {
      alert('Necesito se proporcione la contraseña asociada a la firma electrónica.');
      return false;
    }

    return true;
  }
}
