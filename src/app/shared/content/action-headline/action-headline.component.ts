import {Component, Input} from '@angular/core';
import {ActionButton} from './actionButton.model';

@Component({
    selector: 'action-headline',
    templateUrl: './action-headline.component.html'
})
export class ActionHeadlineComponent {
    @Input() level: number;
    @Input() text: string;
    @Input() actionButtons: Array<ActionButton>;
    @Input() eventParameter: any;

    public constructor() {
    }
}
