import {Component, Input, AfterViewInit} from '@angular/core';
import {Observable} from 'rxjs';

@Component({
    selector: 'simple-number-widget',
    templateUrl: 'simple-number-widget.component.html',
    styleUrls: ['simple-number-widget.component.scss']
})
export class SimpleNumberWidgetComponent implements AfterViewInit {
    public currentNumber: number;

    @Input() data: number;

    public constructor() {
        this.currentNumber = 0;
    }

    public ngAfterViewInit() {
        this.count();
    }

    private count(previousTimeout?: number): void {
        if (this.currentNumber < this.data) {
            window.setTimeout(() => {
                this.currentNumber++
                this.count(this.data - this.currentNumber <= 20 ? previousTimeout * 1.4  : 1);
            }, this.data - this.currentNumber <= 20 ? previousTimeout * 1.4  : 1);
        }
    }
}
