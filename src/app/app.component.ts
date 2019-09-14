/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'emp-ng-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {

  ngOnInit() {

    window.addEventListener('dragover', e => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'none';
    }, false);

    window.addEventListener('drop', e => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'none';
    }, false);

  }

}
