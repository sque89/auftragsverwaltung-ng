import {Subject} from "rxjs";

export interface DoughnutChartWidgetModel {
    chartData: {
        labels: Array<string>;
        datasets: Array<{data: Array<number>, backgroundColor: Array<string>}>;
    },
    refreshChart: Subject<void>
}