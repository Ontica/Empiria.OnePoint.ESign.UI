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
  GET_REFUSED_ERR =
        '[GET_REFUSED_ERR] Ocurrió un problema al leer los documentos regresados.',
  GET_SIGNEVENT_ERR =
        '[GET_SIGNEVENT_ERR] Ocurrió un problema al leer los elementos de la bitácora.',
  POST_SIGN_ERR =
        '[POST_SIGN_ERR] Ocurrió un problema al guardar los documentos firmados.',
  POST_REFUSED_ERR =
        '[POST_REFUSED_ERR] Ocurrió un problema al guardar los documentos rechazados.',
  POST_REVOKE_ERR =
        '[POST_REVOKE_ERR] Ocurrió un problema al enviar los documentos revocados.',
  POST_UNREFUSE_ERR =
        '[POST_UNREFUSED_ERR] Ocurrió un problema al regresar a por firmar los documentos rechazados.',
}

@Injectable()
export class EsignService {

  constructor(private core:CoreService) {}

  public getPendingDocuments(): Observable<SignRequest[]> {
    const path = `v2/e-sign/requests/mine/pending`;

    return this.core.http.get<SignRequest[]>(path)
               .pipe(
                  catchError((e) => this.core.http.showAndThrow(e, Errors.GET_PENDING_ERR))
               );
  }

  public getSignedDocuments(): Observable<SignRequest[]> {
    const path = `v2/e-sign/requests/mine/signed`;

    return this.core.http.get<SignRequest[]>(path)
               .pipe(
                  catchError((e) => this.core.http.showAndThrow(e, Errors.GET_SIGNED_ERR))
               );

  }

  public getRefusedDocuments(): Observable<SignRequest[]> {
    const path = `v2/e-sign/requests/mine/refused`;

    return this.core.http.get<SignRequest[]>(path)
               .pipe(
                  catchError((e) => this.core.http.showAndThrow(e, Errors.GET_REFUSED_ERR))
               );
  }

  public getSignEvents() : Observable<any> {
    const path = `v2/e-sign/events/mine`;

    return this.core.http.get<any>(path)
               .pipe(
                  catchError((e) => this.core.http.showAndThrow(e,Errors.GET_SIGNEVENT_ERR))
               );
  }

  public sign(credentials: object, signRequests: string[]): Observable<any> {
    const body = {
      credentials : credentials,
      signRequests: signRequests
    };

    return this.core.http.post<any>('v2/e-sign/requests/mine/signed', body)
               .pipe(
                  catchError((e) => this.core.http.showAndThrow(e, Errors.POST_SIGN_ERR))
               );
  }

  public refuse(credentials: object, signRequests: string[]): Observable<any> {
    const body = {
      credentials : credentials,
      signRequests: signRequests
    };

    return this.core.http.post<any>('v2/e-sign/requests/mine/refused', body)
               .pipe(
                  catchError((e) => this.core.http.showAndThrow(e, Errors.POST_REFUSED_ERR))
               );
  }

  public revoke(credentials: object, signRequests: string[]): Observable<any> {
    const body = {
      credentials : credentials,
      signRequests: signRequests
    };

    return this.core.http.post<any>('v2/e-sign/requests/mine/revoked', body)
               .pipe(
                  catchError((e) => this.core.http.showAndThrow(e, Errors.POST_REFUSED_ERR))
               );
  }

  public unRefuse(credentials: object, signRequests: string[]): Observable<any> {
    const body = {
      credentials : credentials,
      signRequests: signRequests
    };

    return this.core.http.post<any>('v2/e-sign/requests/mine/unrefused', body)
               .pipe(
                  catchError((e) => this.core.http.showAndThrow(e, Errors.POST_REFUSED_ERR))
               );
  }

  public search(keywords: string): Observable<any> {
    const path = `v2/e-sign/requests/mine?keywords=${keywords}`;

    return this.core.http.get<any[]>(path)
               .pipe(
                  catchError((e) => this.core.http.showAndThrow(e, Errors.GET_PENDING_ERR))
               );
  }
}
