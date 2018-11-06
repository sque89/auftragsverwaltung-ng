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
import * as _ from 'lodash';
import {debounceTime} from 'rxjs/operators';

@Component({
    selector: 'job-list',
    templateUrl: './job-list.component.html',
    styleUrls: ['./job-list.component.scss']
})
export class JobListComponent {
    private jobs: Array<Job>;
    private search: string;

    public filteredJobs: Array<{opened: boolean, job: Job}>;
    public pageSize = this.appService.getSettingById('job_list_jobs_per_page').value;
    public pageSizeOptions: number[] = [5, 10, 25, 100];
    public filterForm: FormGroup;

    public constructor(
        private uiService: UiService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private appService: AppService,
        private jobApiService: JobApiService
    ) {
        this.search = ''
    }

    public ngOnInit() {
        this.jobs = this.activatedRoute.snapshot.data.JobListResolver;
        this.filterJobs();
        this.uiService.closeMainMenu();
        this.filterForm = new FormGroup({
            from: new FormControl(moment().subtract(parseInt(this.appService.getSettingById('job_list_default_timespan').value), 'days').startOf('day')),
            to: new FormControl(moment().endOf('day')),
            search: new FormControl(this.search)
        });
        this.bindFilterChanges();
    }

    private bindFilterChanges() {
        this.filterForm.controls['from'].valueChanges.subscribe(() => {
            this.jobApiService.getJobsInTimespan(this.filterForm.controls['from'].value, this.filterForm.controls['to'].value).subscribe((jobs) => {
                this.jobs = jobs;
                this.filterJobs();
            });
        });
        this.filterForm.controls['to'].valueChanges.subscribe(values => {
            this.jobApiService.getJobsInTimespan(this.filterForm.controls['from'].value, this.filterForm.controls['to'].value).subscribe((jobs) => {
                this.jobs = jobs;
                this.filterJobs();
            });
        });
        this.filterForm.controls['search'].valueChanges.pipe(
            debounceTime(500)
        ).subscribe((newSearch: string) => {
            this.search = newSearch;
            this.filterJobs();
        });
    }

    private filterJobs(): void {
        this.filteredJobs = [];
        this.jobs.forEach((job: Job) => {
            if (
                job.id.toLowerCase().includes(this.search.toLowerCase()) ||
                job.description.toLowerCase().includes(this.search.toLowerCase()) ||
                job.externalPurchase.toLowerCase().includes(this.search.toLowerCase()) ||
                job.notes.toLowerCase().includes(this.search.toLowerCase()) ||
                job.customer.name.toLowerCase().includes(this.search.toLowerCase())
            ) {
                this.filteredJobs.push({opened: !_.isEmpty(this.search), job: job});
            }
        });
    }

    public showJobDetails(job: Job): void {
        this.router.navigate(['/jobs', job.id, 'details']);
    }
}
