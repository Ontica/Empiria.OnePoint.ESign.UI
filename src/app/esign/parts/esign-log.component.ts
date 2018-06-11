/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, OnInit } from '@angular/core';

import { SpinnerService } from '@app/core/ui-services';

import { EsignService } from '../services/esign.service';
import { SignEvent } from '../data-types/signEvent';

import { forEach } from '@angular/router/src/utils/collection';


@Component({
  selector:'esign-log',
  templateUrl: './esign-log.component.html',
  styleUrls: ['./esign-log.component.scss'],
})
export class EsignLogComponent  {

    public signEvents: SignEvent[];
    public commandName = "";
    public isCommandWindowVisible = false;


    constructor (private esignService: EsignService, private spinnerService: SpinnerService){}

    ngOnInit() {
        this.loadSignEvents();
    }

    public getEventTag(eventType: string): string {

       switch(eventType) {
            case 'Signed' :
                return 'Firmado';
            case 'Revoked' :
                return 'Rechazado';
            default:
            return 'Enviado a pendientes';
        }

    }

    private loadSignEvents(): void {
        this.spinnerService.show();

        this.esignService.getSignEvents()
            .subscribe((signEvents) => { this.signEvents = signEvents; console.log(this.signEvents) },
                        () => {},
                        () => { this.spinnerService.hide(); });
    }

}
