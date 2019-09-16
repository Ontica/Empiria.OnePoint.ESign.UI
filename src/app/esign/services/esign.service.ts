/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpService } from '@app/core';

import { SignRequest } from '../data-types/signRequest';


@Injectable()
export class ESignService {

  constructor(private http: HttpService) { }

  // get methods

  getPendingDocuments(): Observable<SignRequest[]> {
    const path = `v2/e-sign/requests/mine/pending`;

    return this.http.get<SignRequest[]>(path);
  }


  getRevokedDocuments(): Observable<SignRequest[]> {
    const path = `v2/e-sign/requests/mine/revoked`;

    return this.http.get<SignRequest[]>(path);
  }


  getSignedDocuments(): Observable<SignRequest[]> {
    const path = `v2/e-sign/requests/mine/signed`;

    return this.http.get<SignRequest[]>(path);
  }


  getSignEvents(): Observable<any> {
    const path = `v2/e-sign/events/mine`;

    return this.http.get<any>(path);
  }


  // action methods

  revoke(credentials: object, signRequests: string[]): Observable<any> {
    const body = {
      credentials,
      signRequests
    };

    return this.http.post<any>('v2/e-sign/requests/mine/revoked', body);
  }


  search(keywords: string): Observable<any> {
    const path = `v2/e-sign/requests/mine?keywords=${keywords}`;

    return this.http.get<any[]>(path);
  }


  sign(credentials: object, signRequests: string[]): Observable<any> {
    const body = {
      credentials,
      signRequests
    };

    return this.http.post<any>('v2/e-sign/requests/mine/signed', body);
  }

}
