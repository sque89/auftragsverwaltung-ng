import * as _ from 'lodash';
import * as moment from 'moment';
import {Component, ComponentFactoryResolver, ViewChildren, ViewContainerRef, QueryList, AfterViewInit} from '@angular/core';
import {JobApiService} from '../core/services/job-api.service';
import {forkJoin, Subject} from 'rxjs';
import {UiService} from '../core/services/ui.service';
import {QuickstartWidgetModel} from '../shared/widgets/quickstart/quickstart-widget.model';
import {DoughnutChartWidgetModel} from '../shared/widgets/doughnut-chart/doughnut-chart-widget.model';
import {BarChartWidgetModel} from '../shared/widgets/bar-chart/bar-chart-widget.model';
import {JobListWidgetComponent} from '../shared/widgets/job-list/job-list-widget.component';
import {QuickstartWidgetComponent} from '../shared/widgets/quickstart/quickstart-widget.component';
import {SimpleNumberWidgetComponent} from '../shared/widgets/simple-number/simple-number-widget.component';
import {BarChartWidgetComponent} from '../shared/widgets/bar-chart/bar-chart-widget.component';
import {DoughnutChartWidgetComponent} from '../shared/widgets/doughnut-chart/doughnut-chart-widget.component';
import {CdkDragDrop} from '@angular/cdk/drag-drop';
import {UtilService} from '../core/services/util.service';
import {SessionService} from '../core/services/session.service';
import {UserApiService} from '../core/services/user-api.service';
import {NotificationService} from '../core/services/notification.service';
import {DashboardWidget} from './dashboard-widget.model';

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {
    public quickstartLinks: Array<QuickstartWidgetModel>;
    public overdueJobChartData: DoughnutChartWidgetModel;
    public incomingJobChartData: BarChartWidgetModel;
    public isLoading: boolean;

    public widgets: Array<DashboardWidget>;

    @ViewChildren('widgetContainer', {read: ViewContainerRef}) public widgetTargets: QueryList<ViewContainerRef>;

    public constructor(
        public jobApiService: JobApiService,
        private uiService: UiService,
        private compFactory: ComponentFactoryResolver,
        private utilService: UtilService,
        private sessionService: SessionService,
        private userApiService: UserApiService,
        private notificationService: NotificationService
    ) {
        this.isLoading = true;
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

        this.widgets = [
            {id: 'own_jobs_open', label: 'Eigene offene Jobs', cols: '8', component: this.compFactory.resolveComponentFactory(JobListWidgetComponent), data: null},
            {id: 'quickstart', label: 'Schnellstart', cols: '4', component: this.compFactory.resolveComponentFactory(QuickstartWidgetComponent), data: null},
            {id: 'jobs_open_count', label: 'Offene Jobs (gesamt)', cols: '4', component: this.compFactory.resolveComponentFactory(SimpleNumberWidgetComponent), data: null},
            {id: 'job_income', label: 'Jobeingänge pro Tag', cols: '8', component: this.compFactory.resolveComponentFactory(BarChartWidgetComponent), data: null},
            {id: 'jobs_overdue_count', label: 'Überfällige Jobs (gesamt)', cols: '4', component: this.compFactory.resolveComponentFactory(DoughnutChartWidgetComponent), data: null}
        ];
    }

    public ngAfterViewInit() {
        const startDate = moment().startOf('month');
        const endDate = moment();

        forkJoin([
            this.jobApiService.getOpenJobsForLoggedInUser(true),
            this.jobApiService.getOpenJobCount(true),
            this.jobApiService.getOpenIntimeJobCount(true),
            this.jobApiService.getOpenOverdueJobCount(true),
            this.jobApiService.getJobIncomeCountInTimespan(startDate, endDate)
        ]).subscribe((data) => {
            this.overdueJobChartData.chartData.datasets[0].data.push(data[3]);
            this.overdueJobChartData.chartData.datasets[0].data.push(data[2]);

            for (const current = startDate; current.diff(endDate, 'days') <= 0; current.add(1, 'days')) {
                const dateForCurrent = _.find(data[4], {date: current.format('DD.MM.YYYY')});
                this.incomingJobChartData.chartData.labels.push(current.format('DD.MM.YYYY'));
                this.incomingJobChartData.chartData.datasets[0].data.push(
                    dateForCurrent ? dateForCurrent.count : 0
                );
            }

            this.setWidgetData(data);
            this.renderWidgets();
            if (this.sessionService.getUser().settings) {
                this.sortWidgetsByUserSettings();
            }

            this.isLoading = false;

            this.incomingJobChartData.refreshChart.next();
            this.overdueJobChartData.refreshChart.next();
        });
    }

    private renderWidgets(): void {
        for (let i = 0; i < this.widgetTargets.toArray().length; i++) {
            let conf = this.widgets[i];
            let component = conf.component;
            if (component) {
                let target = this.widgetTargets.toArray()[i];
                let cmpRef: any = target.createComponent(component);
                (cmpRef.instance).data = conf.data;
            }
        }
    }

    private setWidgetData(data: any): void {
        this.widgets[0].data = data[0];
        this.widgets[1].data = this.quickstartLinks;
        this.widgets[2].data = data[1];
        this.widgets[3].data = this.incomingJobChartData;
        this.widgets[4].data = this.overdueJobChartData;
    }

    private sortWidgetsByUserSettings(): void {
        const userWidgetSettings = this.sessionService.getUser().settings.dashboardWidgets;
        userWidgetSettings.forEach((widget, index) => {
            this.widgets = this.utilService.moveItemInArrayFromIndexToIndex(this.widgets, _.findIndex(this.widgets, {id: widget}), index);
        });
    }

    public dropWidget(event: CdkDragDrop<string[]>): void {
        this.widgets = this.utilService.moveItemInArrayFromIndexToIndex(this.widgets, event.previousIndex, event.currentIndex);
        this.sessionService.getUser().setDashboardWidgetSettings(_.map(this.widgets, 'id'));
        this.sessionService.setUser(this.sessionService.getUser());
        this.userApiService.changeSettings(this.sessionService.getUser()).subscribe(() => {
            this.notificationService.showSuccess('Dashboard Einstellungen gespeichert');
        }, () => {
            this.notificationService.showError('Beim Speichern des Dashboards ist ein Fehler aufgetreten');
        });
    }
}
