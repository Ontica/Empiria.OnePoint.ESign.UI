/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { SpinnerService } from './spinner.service';
import { SpinnerState } from './loader-state';

@Component({
    selector: 'angular-loader',    
    templateUrl: './spinner.component.html',
    styleUrls: ['./spinner.component.scss']

})

export class SpinnerComponent implements OnInit {

@HostBinding('style.display') public display = 'block';
@HostBinding('style.position') public position = 'absolute';

public show = false;
private subscription: Subscription;

constructor(private spinnerService: SpinnerService) { }

ngOnInit() { 

    this.subscription = this.spinnerService.spinnerState
        .subscribe((state: SpinnerState) => {
          this.show = state.show;
        });
}

ngOnDestroy() {
    this.subscription.unsubscribe();
}

}