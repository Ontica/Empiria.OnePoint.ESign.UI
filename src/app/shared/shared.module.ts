/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MainLayoutComponent } from './main-layout/main-layout.component';

import { NavbarComponent } from './navbar/navbar.component';
import { NoContentComponent } from './no-content/no-content.component';

import { SafeHtmlPipe } from './pipes/safe-html.pipe';

import { AutocompleteControl } from './controls/autocomplete-control';
import { Chips } from './controls/chips';
import { RAGControl } from './controls/rag.control';
import { CalendarControl } from './controls/calendar-control';
import { SelectControl } from './controls/select-control';

import { ProjectSelectorControl } from './controls/project-selector-control';

import { NavBarService } from './navbar/navbar.service';
import { ProjectSelectorService } from './controls/project-selector.service';

import { SpinnerComponent } from './spinner/spinner.component';
import { SpinnerService } from './spinner/spinner.service';
import { ModalWindowComponent } from './modal-window/modal-window';

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [RouterModule, CommonModule, FormsModule],
  declarations: [MainLayoutComponent, NavbarComponent, NoContentComponent, SafeHtmlPipe,
                 AutocompleteControl, Chips, RAGControl, CalendarControl, SelectControl,
                ProjectSelectorControl,SpinnerComponent, ModalWindowComponent],
  exports: [MainLayoutComponent, NoContentComponent, SafeHtmlPipe, AutocompleteControl, Chips,
            RAGControl, CalendarControl, SelectControl,  ModalWindowComponent],
  providers:[NavBarService, ProjectSelectorService, SpinnerService]
})
export class SharedModule { }
