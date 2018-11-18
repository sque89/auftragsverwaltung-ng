import {Component, Input, AfterViewInit} from '@angular/core';
import {Observable} from 'rxjs';

@Component({
    selector: 'simple-number-widget',
    templateUrl: 'simple-number-widget.component.html',
    styleUrls: ['simple-number-widget.component.scss']
})
export class SimpleNumberWidgetComponent implements AfterViewInit {
    private duration: number;
    private limit: number;
    public currentNumber: number;

    @Input() number: Observable<number>;

    public constructor() {
        this.currentNumber = 0;
        this.duration = 5;
    }

    public ngAfterViewInit() {
        this.number.subscribe((number) => {
            this.limit = number;
            this.count();
        });
    }

    private count(previousTimeout?: number): void {
        if (this.currentNumber < this.limit) {
            const numberLeft = this.limit - this.currentNumber;
            const nextTimeout = numberLeft <= 20 ? previousTimeout * 1.4  : 1;
            window.setTimeout(() => {
                this.currentNumber++
                this.count(nextTimeout);
            }, nextTimeout);
        }
    }
}
