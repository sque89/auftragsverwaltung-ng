import {Component} from '@angular/core';
import {JobApiService} from '../core/services/job-api.service';
import {Observable, forkJoin} from 'rxjs';
import {Job} from '../core/models/job.model';
import {share} from 'rxjs/operators';
import {UiService} from '../core/services/ui.service';

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

    public quickstartLinks = [
        {label: 'Jobliste', routerLink: ['/jobs'], icon: 'list'},
        {label: 'Neuer Job', routerLink: ['/jobs', 'neu'], icon: 'add'}
    ];

    public overdueJobChartData = {
        labels: ['im Zeitplan', 'überfällig'],
        backgroundColor: [
            this.uiService.COLORS.PRIMARY,
            this.uiService.COLORS.DANGER
        ]
    };

    public constructor(public jobApiService: JobApiService, private uiService: UiService) {
        this.ownOpenJobs$ = this.jobApiService.getOpenJobsForLoggedInUser(true).pipe(share());
        this.openJobCount$ = this.jobApiService.getOpenJobCount(true).pipe(share());
        this.openOverdueJobCount$ = this.jobApiService.getOpenOverdueJobCount(true).pipe(share());
        this.openInTimeJobCount$ = this.jobApiService.getOpenIntimeJobCount(true).pipe(share());

        this.openOverdueJobCountChartData$ = forkJoin([
            this.jobApiService.getOpenOverdueJobCount(true),
            this.jobApiService.getOpenIntimeJobCount(true)
        ]).pipe(share());
    }
}
