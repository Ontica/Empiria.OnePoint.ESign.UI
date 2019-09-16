/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component } from '@angular/core';


@Component({
    selector: 'emp-one-esign-main-page',
    templateUrl: './esign-main-page.component.html',
    styleUrls: ['./esign-main-page.component.scss']
})
export class EsignMainPageComponent {

  option = '';
  isDocumentDisplayed = false;
  documentURI = '';
  leftContainerClass = 'columns small-12';


  displayDocument(): void {
    this.isDocumentDisplayed = true;
  }


  onChangeOption(option: string): void {
    this.option = option;

    this.onHideDocument();
  }


  onDisplayDocument(URI: string): void {
    this.leftContainerClass = 'columns small-4 hide-for-small-only';

    this.documentURI = URI;
    this.isDocumentDisplayed = true;
  }


  onHideDocument(): void {
    this.isDocumentDisplayed = false;

    this.leftContainerClass = 'columns small-12';
  }

 }
