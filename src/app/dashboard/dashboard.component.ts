import * as _ from 'lodash';
import * as moment from 'moment';
import {Component} from '@angular/core';
import {JobApiService} from '../core/services/job-api.service';
import {Observable, forkJoin, Subject} from 'rxjs';
import {Job} from '../core/models/job.model';
import {share} from 'rxjs/operators';
import {UiService} from '../core/services/ui.service';
import {Moment} from "moment";
import {QuickstartWidgetModel} from '../shared/widgets/quickstart/quickstart-widget.model';
import {DoughnutChartWidgetModel} from '../shared/widgets/doughnut-chart/doughnut-chart-widget.model';
import {BarChartWidgetModel} from '../shared/widgets/bar-chart/bar-chart-widget.model';

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
    public ownOpenJobs$: Observable<Array<Job>>;
    public openJobCount$: Observable<number>;
    public openOverdueJobCountChartData$: Observable<Array<number>>;
    public openOverdueJobCount$: Observable<number>;
    public openInTimeJobCount$: Observable<number>;
    public incomeCurrentMonth$: Observable<Array<{date: Moment, count: number}>>;

    public quickstartLinks: Array<QuickstartWidgetModel>;
    public overdueJobChartData: DoughnutChartWidgetModel;
    public incomingJobChartData: BarChartWidgetModel;

    public constructor(public jobApiService: JobApiService, private uiService: UiService) {
        this.ownOpenJobs$ = this.jobApiService.getOpenJobsForLoggedInUser(true).pipe(share());
        this.openJobCount$ = this.jobApiService.getOpenJobCount(true).pipe(share());
        this.openOverdueJobCount$ = this.jobApiService.getOpenOverdueJobCount(true).pipe(share());
        this.openInTimeJobCount$ = this.jobApiService.getOpenIntimeJobCount(true).pipe(share());

        this.quickstartLinks = [
            {label: 'Jobliste', routerLink: ['/jobs'], icon: 'list'},
            {label: 'Neuer Job', routerLink: ['/jobs', 'neu'], icon: 'add'}
        ];

        this.overdueJobChartData = {
            chartData: {
                labels: ['im Zeitplan', 'überfällig'],
                datasets: [
                    {
                        data: [],
                        backgroundColor: [
                            this.uiService.COLORS.PRIMARY,
                            this.uiService.COLORS.DANGER
                        ]
                    },
                ]
            },
            refreshChart: new Subject()
        };

        forkJoin([
            this.jobApiService.getOpenOverdueJobCount(true),
            this.jobApiService.getOpenIntimeJobCount(true)
        ]).subscribe((data) => {
            this.overdueJobChartData.chartData.datasets[0].data.push(data[0]);
            this.overdueJobChartData.chartData.datasets[0].data.push(data[1]);
            this.overdueJobChartData.refreshChart.next();
        });

        this.incomingJobChartData = {
            chartData: {
                labels: [],
                datasets: [{
                    label: 'Jobeingänge pro Tag',
                    data: [],
                    backgroundColor: this.uiService.COLORS.PRIMARY
                }]
            },
            refreshChart: new Subject()
        };

        const startDate = moment().startOf('month');
        const endDate = moment();
        this.jobApiService.getJobIncomeCountInTimespan(startDate, endDate).subscribe((dates) => {
            for (const current = startDate; current.diff(endDate, 'days') <= 0; current.add(1, 'days')) {
                const dateForCurrent = _.find(dates, {date: current.format('DD.MM.YYYY')});
                this.incomingJobChartData.chartData.labels.push(current.format('DD.MM.YYYY'));
                this.incomingJobChartData.chartData.datasets[0].data.push(
                    dateForCurrent ? dateForCurrent.count : 0
                );
            }
            this.incomingJobChartData.refreshChart.next();
        });
    }
}
