import {Component} from '@angular/core';
import {JobApiService} from '../core/services/job-api.service';

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
    public ownOpenJobs$ = this.jobApiService.getOpenJobsForLoggedInUser(true);
    public quickstartLinks = [
        {label: 'Jobliste', routerLink: ['/jobs'], icon: 'list'},
        {label: 'Neuer Job', routerLink: ['/jobs', 'neu'], icon: 'add'}
    ];

    public constructor(public jobApiService: JobApiService) {
    }
}
