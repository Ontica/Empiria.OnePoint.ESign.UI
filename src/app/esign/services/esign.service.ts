/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { CoreService } from '../../core/core.service';

import { SignRequest } from '../data-types/signRequest';


enum Errors {
  GET_PENDING_ERR =
    '[GET_PENDING_ERR] No pude leer los documnentos por firmar.',
  GET_SIGNED_ERR =
    '[GET_SIGNED_ERR] Ocurrió un problema al leer los documentos firmados.',
  GET_REVOKED_ERR =
    '[GET_REVOKED_ERR] Ocurrió un problema al leer los documentos con firma revocada.',
  GET_SIGNEVENT_ERR =
    '[GET_SIGNEVENT_ERR] Ocurrió un problema al leer los elementos de la bitácora.',
  POST_SIGN_ERR =
    '[POST_SIGN_ERR] Ocurrió un problema al guardar los documentos firmados.',
  POST_REVOKE_ERR =
    '[POST_REVOKE_ERR] Ocurrió un problema al enviar los documentos revocados.',
}


@Injectable()
export class EsignService {

  constructor(private core: CoreService) { }

  // get methods

  getPendingDocuments(): Observable<SignRequest[]> {
    const path = `v2/e-sign/requests/mine/pending`;

    return this.core.http.get<SignRequest[]>(path)
      .pipe(
        catchError((e) => this.core.http.showAndThrow(e, Errors.GET_PENDING_ERR))
      );
  }


  getRevokedDocuments(): Observable<SignRequest[]> {
    const path = `v2/e-sign/requests/mine/revoked`;

    return this.core.http.get<SignRequest[]>(path)
      .pipe(
        catchError((e) => this.core.http.showAndThrow(e, Errors.GET_REVOKED_ERR))
      );
  }


  getSignedDocuments(): Observable<SignRequest[]> {
    const path = `v2/e-sign/requests/mine/signed`;

    return this.core.http.get<SignRequest[]>(path)
      .pipe(
        catchError((e) => this.core.http.showAndThrow(e, Errors.GET_SIGNED_ERR))
      );

  }


  getSignEvents(): Observable<any> {
    const path = `v2/e-sign/events/mine`;

    return this.core.http.get<any>(path)
      .pipe(
        catchError((e) => this.core.http.showAndThrow(e, Errors.GET_SIGNEVENT_ERR))
      );
  }


  // action methods

  revoke(credentials: object, signRequests: string[]): Observable<any> {
    const body = {
      credentials: credentials,
      signRequests: signRequests
    };

    return this.core.http.post<any>('v2/e-sign/requests/mine/revoked', body)
      .pipe(
        catchError((e) => this.core.http.showAndThrow(e, Errors.POST_REVOKE_ERR))
      );
  }


  search(keywords: string): Observable<any> {
    const path = `v2/e-sign/requests/mine?keywords=${keywords}`;

    return this.core.http.get<any[]>(path)
      .pipe(
        catchError((e) => this.core.http.showAndThrow(e, Errors.GET_PENDING_ERR))
      );
  }


  sign(credentials: object, signRequests: string[]): Observable<any> {
    const body = {
      credentials: credentials,
      signRequests: signRequests
    };

    return this.core.http.post<any>('v2/e-sign/requests/mine/signed', body)
      .pipe(
        catchError((e) => this.core.http.showAndThrow(e, Errors.POST_SIGN_ERR))
      );
  }

}
