
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { SpinnerState } from './loader-state';

@Injectable()
export class SpinnerService {

    private spinnerSubject = new Subject<SpinnerState>(); 
    spinnerState = this.spinnerSubject.asObservable();

    constructor() { }

    show() {

        this.spinnerSubject.next(<SpinnerState>{show: true});
     }

    hide() {
        this.spinnerSubject.next(<SpinnerState>{show: false});

    }
    
}