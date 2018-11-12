import {Component, Input} from '@angular/core';
import {trigger, transition, useAnimation} from '@angular/animations';
import {tada, jackInTheBox, jello, swing} from 'ng-animate';

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

    @Input() links: {label: String, routerLink: any};

    public constructor() {
        this.jackInTheBox = false;
    }
}
