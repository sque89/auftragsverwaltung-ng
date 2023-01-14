import {Component, Input, ViewChild, AfterViewInit} from '@angular/core';
import {DoughnutChartWidgetModel} from './doughnut-chart-widget.model';
import {UIChart} from 'primeng/chart';

@Component({
    selector: 'doughnut-chart-widget',
    templateUrl: 'doughnut-chart-widget.component.html',
    styleUrls: ['doughnut-chart-widget.component.scss']
})
export class DoughnutChartWidgetComponent implements AfterViewInit {
    @ViewChild('chart', { static: true })
    private chart: UIChart;

    @Input() data: DoughnutChartWidgetModel;

    public constructor() {
    }

    public ngAfterViewInit() {
        this.data.refreshChart.subscribe(() => {
            this.chart.refresh();
        });
    }
}
