export interface DoughnutChartWidgetDataModel {
    labels: Array<string>;
    datasets: Array<{data: Array<number>, backgroundColor: Array<string>}>;
}