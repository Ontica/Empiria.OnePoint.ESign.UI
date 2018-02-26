import { Component, Input } from '@angular/core';

@Component({
    selector: 'document-viewer',
    templateUrl: './esign-document-viewer.component.html',
    styleUrls: ['./esign-document-viewer.component.scss']
})

export class EsignDocumentViewerComponent {

    @Input() public documentURI: string = '';           

}
