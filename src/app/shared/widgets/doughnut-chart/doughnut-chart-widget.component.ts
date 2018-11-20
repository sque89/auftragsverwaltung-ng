import {Component, Input, AfterViewInit, ViewChild} from '@angular/core';
import {DoughnutChartWidgetDataModel} from './data.model';
import {Observable} from 'rxjs';
import {UIChart} from 'primeng/primeng';

@Component({
    selector: 'doughnut-chart-widget',
    templateUrl: 'doughnut-chart-widget.component.html',
    styleUrls: ['doughnut-chart-widget.component.scss']
})
export class DoughnutChartWidgetComponent implements AfterViewInit {
    public chartData: DoughnutChartWidgetDataModel;

    @ViewChild('chart')
    private chart: UIChart;

    @Input() labels: Array<string>;
    @Input() backgroundColors: Array<string>;
    @Input() data: Observable<Array<number>>;

    public constructor() {
        this.chartData = {labels: [], datasets: [{data: [], backgroundColor: []}]};
    }

    public ngAfterViewInit() {
        this.chartData.labels = this.labels;
        this.chartData.datasets[0].backgroundColor = this.backgroundColors;
        this.data.subscribe((values: Array<number>) => {
            this.chartData.datasets[0].data = values;
            this.chart.refresh();
        });
    }
}
