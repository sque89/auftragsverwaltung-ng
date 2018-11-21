import {Component, Input, AfterViewInit} from '@angular/core';
import {Observable} from 'rxjs';

@Component({
    selector: 'simple-number-widget',
    templateUrl: 'simple-number-widget.component.html',
    styleUrls: ['simple-number-widget.component.scss']
})
export class SimpleNumberWidgetComponent implements AfterViewInit {
    private limit: number;
    public currentNumber: number;

    @Input() data: Observable<number>;

    public constructor() {
        this.currentNumber = 0;
    }

    public ngAfterViewInit() {
        this.data.subscribe((number) => {
            this.limit = number;
            this.count();
        });
    }

    private count(previousTimeout?: number): void {
        if (this.currentNumber < this.limit) {
            window.setTimeout(() => {
                this.currentNumber++
                this.count(this.limit - this.currentNumber <= 20 ? previousTimeout * 1.4  : 1);
            }, this.limit - this.currentNumber <= 20 ? previousTimeout * 1.4  : 1);
        }
    }
}
