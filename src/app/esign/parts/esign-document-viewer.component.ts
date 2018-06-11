/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, Input } from '@angular/core';


@Component({
  selector: 'document-viewer',
  templateUrl: './esign-document-viewer.component.html',
  styleUrls: ['./esign-document-viewer.component.scss']
})
export class EsignDocumentViewerComponent {

  @Input() public documentURI: string = '';

}
