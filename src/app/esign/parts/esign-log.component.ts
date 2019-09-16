/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, OnInit } from '@angular/core';

import { SpinnerService } from '@app/core/ui-services';

import { ESignService } from '../services/esign.service';
import { SignEvent } from '../data-types/signEvent';


@Component({
  selector: 'emp-one-esign-log',
  templateUrl: './esign-log.component.html',
  styleUrls: ['./esign-log.component.scss'],
})
export class ESignLogComponent implements OnInit {

  signEvents: SignEvent[];
  commandName = '';
  isCommandWindowVisible = false;

  constructor(private esignService: ESignService,
              private spinnerService: SpinnerService) { }


  ngOnInit() {
    this.loadSignEvents();
  }


  getEventTag(eventType: string): string {
    switch (eventType) {
      case 'Signed':
        return 'Firmado';
      case 'Revoked':
        return 'Revocado';
      default:
        return 'Enviado a pendientes';
    }

  }

  private loadSignEvents(): void {
    this.spinnerService.show();

    this.esignService.getSignEvents()
      .subscribe((signEvents) => { this.signEvents = signEvents; console.log(this.signEvents); },
        () => { },
        () => { this.spinnerService.hide(); });
  }

}
