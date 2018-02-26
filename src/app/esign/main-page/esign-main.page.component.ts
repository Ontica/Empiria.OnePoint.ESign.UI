/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { Component } from '@angular/core';
import { MainPageComponent } from '../../shared/modal-window';

@Component({
    selector:'esign-main-page',
    templateUrl: './esign-main-page.component.html',
    styleUrls: ['./esign-main-page.component.scss']
})

export class EsignMainPageComponent {

  public option = '';
  public isDocumentDisplayed = false;
  public documentURI = ''; 
  
  public leftContainerClass = 'columns small-12'

  onChangeOption(option: string): void {
    this.option = option;
      
    this.onHideDocument(); 
  }

  public onDisplayDocument(URI: string): void {       
    this.leftContainerClass = "columns small-6 hide-for-small-only";

    this.documentURI = URI;
    this.isDocumentDisplayed = true;    
  }

  public onHideDocument(): void {
    this.isDocumentDisplayed = false;    

    this.leftContainerClass = "columns small-12";  
  }

  public displayDocument(): void {  
    this.isDocumentDisplayed = true;
  }

   
 }
