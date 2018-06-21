/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Pipe, PipeTransform } from '@angular/core';

import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Pipe({
  name: 'secureUrl'
})
export class SecureResourceUrlPipe implements PipeTransform  {

  constructor(private sanitized: DomSanitizer) {}

  transform(value) {
    if (value) {
      return this.sanitized.bypassSecurityTrustResourceUrl(value);
    } else {
      return "";
    }
  }

}
