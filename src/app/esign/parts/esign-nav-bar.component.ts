/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, EventEmitter, Output, OnInit } from '@angular/core';


@Component({
  selector: 'esign-nav-bar',
  templateUrl: './esign-nav-bar.component.html',
  styleUrls: ['./esign-nav-bar.component.scss']
})
export class EsignNavBarComponent implements OnInit {

  selectedOption: string = 'pendingDocuments';

  @Output() onSelectOption = new EventEmitter<string>();


  ngOnInit() {
    this.onSelectOption.emit(this.selectedOption);
  }


  setSelectedStyle(option: string): void {
    this.selectedOption  = option;

    this.onSelectOption.emit(this.selectedOption);
  }

}
