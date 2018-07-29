/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


/*
 * Platform and Environment providers/directives/pipes
 */
import { environment } from 'environments/environment';

/*
 * Empiria Steps Application Modules
 */
import { CoreModule } from './core/core.module';
import { SecurityUIModule } from './security-ui/security-ui.module';
import { SharedModule } from './shared/shared.module';

import { EsignModule } from './esign/esign.module';


// App is our top level component
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { APP_RESOLVER_PROVIDERS } from './app.resolver';


// Define global exception handler provider
import { ErrorHandler } from '@angular/core';
import { ExceptionHandler } from './core/general/exception-handler';

const EXCEPTION_HANDLER_PROVIDER = { provide: ErrorHandler, useClass: ExceptionHandler };


// Temporarily main SCSS file injection
import '../styles/styles.scss';
import '../styles/headings.css';


// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  EXCEPTION_HANDLER_PROVIDER
];


/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent],
  /**
   * Import Angular's modules.
   */
  imports: [
    CoreModule,
    SecurityUIModule,
    SharedModule,
    EsignModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
  ],
  /**
   * Expose our Services and Providers into Angular's dependency injection.
   */
  providers: [
    environment.ENV_PROVIDERS,
    APP_PROVIDERS
  ]
})
export class AppModule { }
