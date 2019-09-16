/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { Component, EventEmitter, HostBinding, Input, Output  } from '@angular/core';

@Component({
    selector: 'emp-ng-modal-window',
    templateUrl: './modal-window.html',
    styleUrls: ['./modal-window.scss']
})

export class ModalWindowComponent {

  @HostBinding('style.display') display = 'block';

  @HostBinding('style.position') position = 'absolute';

  @Input() title = '';

  @Output() closeWindow = new EventEmitter();

  close(): void {
    this.closeWindow.emit();
  }

}
