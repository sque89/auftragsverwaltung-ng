import {Component, ViewChild} from '@angular/core';
import {Job} from '../../core/models/job.model';
import {MatTableDataSource, MatSort, MatPaginator} from '@angular/material';
import {UiService} from '../../core/services/ui.service';
import {ActivatedRoute, Router} from '@angular/router';
import {trigger, state, transition, style, animate} from '@angular/animations';
import {AppService} from '../../core/services/app.service';
import {Moment} from 'moment';
import * as moment from 'moment'
import {FormGroup, FormControl} from '@angular/forms';
import {JobApiService} from '../../core/services/job-api.service';

@Component({
    selector: 'job-list',
    templateUrl: './job-list.component.html',
    styleUrls: ['./job-list.component.scss']
})
export class JobListComponent {
    public jobs: Array<Job>;
    public pageSize = this.appService.getSettingById('job_list_jobs_per_page').value;
    public pageSizeOptions: number[] = [5, 10, 25, 100];
    public timespanForm: FormGroup;

    public constructor(
        private uiService: UiService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private appService: AppService,
        private jobApiService: JobApiService
    ) {}

    public ngOnInit() {
        this.jobs = this.activatedRoute.snapshot.data.JobListResolver;
        this.uiService.closeMainMenu();
        this.timespanForm = new FormGroup({
            from: new FormControl(moment().subtract(parseInt(this.appService.getSettingById('job_list_default_timespan').value), 'days').startOf('day')),
            to: new FormControl(moment().endOf('day'))
        });
        this.bindTimespanChanges();
    }

    private bindTimespanChanges() {
        this.timespanForm.valueChanges.subscribe(values => {
            this.jobApiService.getJobsInTimespan(values.from, values.to).subscribe((jobs) => {
                this.jobs = jobs;
            });
        });
    }

    public showJobDetails(job: Job) {
        this.router.navigate(['/jobs', job.id, 'details']);
    }
}
