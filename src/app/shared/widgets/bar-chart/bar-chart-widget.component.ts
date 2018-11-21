import {Component, Input, ViewChild, AfterViewInit} from '@angular/core';
import {BarChartWidgetModel} from './bar-chart-widget.model';
import {UIChart} from 'primeng/components/chart/chart';

@Component({
    selector: 'bar-chart-widget',
    templateUrl: 'bar-chart-widget.component.html',
    styleUrls: ['bar-chart-widget.component.scss']
})
export class BarChartWidgetComponent implements AfterViewInit {
    @ViewChild('chart')
    private chart: UIChart;

    @Input() data: BarChartWidgetModel;

    public constructor() {
    }

    public ngAfterViewInit() {
        this.data.refreshChart.subscribe(() => {
            this.chart.refresh();
        });
    }
}
