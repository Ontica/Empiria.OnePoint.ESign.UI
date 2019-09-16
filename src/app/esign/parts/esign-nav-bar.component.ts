/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, EventEmitter, Output, OnInit } from '@angular/core';


@Component({
  selector: 'emp-one-esign-nav-bar',
  templateUrl: './esign-nav-bar.component.html',
  styleUrls: ['./esign-nav-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {

  selectedOption = 'pendingDocuments';

  @Output() selectOption = new EventEmitter<string>();


  ngOnInit() {
    this.selectOption.emit(this.selectedOption);
  }


  setSelectedStyle(option: string): void {
    this.selectedOption  = option;

    this.selectOption.emit(this.selectedOption);
  }

}
