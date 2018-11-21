import {Subject} from "rxjs";

export interface BarChartWidgetModel {
    chartData: {
        labels: Array<string>;
        datasets: Array<{label: string, data: Array<number>, backgroundColor: string}>;
    },
    refreshChart: Subject<void>
}