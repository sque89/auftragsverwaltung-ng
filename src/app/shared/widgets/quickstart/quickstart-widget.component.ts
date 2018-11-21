import {Component, Input} from '@angular/core';
import {trigger, transition, useAnimation} from '@angular/animations';
import {jackInTheBox} from 'ng-animate';
import {QuickstartWidgetModel} from './quickstart-widget.model';

@Component({
    selector: 'quickstart-widget',
    templateUrl: './quickstart-widget.component.html',
    styleUrls: ['./quickstart-widget.component.scss'],
    animations: [
        trigger('jackInTheBox', [transition('* => *', useAnimation(jackInTheBox))])
    ]
})
export class QuickstartWidgetComponent {
    public jello: boolean;
    public jackInTheBox: any;

    @Input() data: Array<QuickstartWidgetModel>;

    public constructor() {
        this.jackInTheBox = false;
    }
}
