import {Component, ViewChild, OnInit} from '@angular/core';
import {Job} from '../../core/models/job.model';
import {UiService} from '../../core/services/ui.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AppService} from '../../core/services/app.service';
import {FormGroup, FormControl} from '@angular/forms';
import {JobApiService} from '../../core/services/job-api.service';
import {debounceTime} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {JobService} from '../job.service';
import * as _ from 'lodash';
import * as moment from 'moment'
import {PageEvent, MatPaginator} from '@angular/material';
import {SessionService} from '../../core/services/session.service';

@Component({
    selector: 'job-list',
    templateUrl: './job-list.component.html',
    styleUrls: ['./job-list.component.scss']
})
export class JobListComponent implements OnInit {
    private jobsInTimespan: Array<Job>;
    public jobsInTimespanFiltered: Array<{opened: boolean, job: Job}>;
    public jobsInTimespanFilteredPaged: Array<{opened: boolean, job: Job}>;

    private searchString: string;

    public filterForm: FormGroup;

    @ViewChild('paginator')
    private paginator: MatPaginator;
    public pageSize = this.appService.getSettingById('job_list_jobs_per_page').value;
    public pageSizeOptions: number[] = [10, 25, 50];

    public sortDirectionAsc: boolean;

    public updateTaskTable: Subject<void>;

    public constructor(
        private uiService: UiService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private appService: AppService,
        private jobApiService: JobApiService,
        public jobService: JobService,
        public sessionService: SessionService
    ) {
        this.jobsInTimespan = [];
        this.jobsInTimespanFiltered = [];
        this.jobsInTimespanFilteredPaged = [];
        this.searchString = ''
        this.updateTaskTable = new Subject();
        this.sortDirectionAsc = false;
    }

    public ngOnInit() {
        this.uiService.closeMainMenu();
        this.jobsInTimespan = this.activatedRoute.snapshot.data.JobListResolver;
        this.filterForm = new FormGroup({
            from: new FormControl(moment().subtract(parseInt(this.appService.getSettingById('job_list_default_timespan').value), 'days').startOf('day')),
            to: new FormControl(moment().endOf('day')),
            search: new FormControl(this.searchString),
            sort: new FormControl('id'),
            filterOpen: new FormControl(),
            filterClosed: new FormControl(false),
            filterOverdue: new FormControl(false)
        });

        this.bindRouteQueryParamChanges();
        this.bindFilterChanges();

        this.filterForm.controls['filterOpen'].setValue(true);
        this.sortJobsByProperty('id', this.sortDirectionAsc);
        this.filterJobs();

        this.paginator.initialized.subscribe(() => {
            this.updatePage();
        });
    }

    private bindFilterChanges() {
        this.filterForm.controls['from'].valueChanges.subscribe(() => {
            this.jobApiService.getJobsInTimespan(this.filterForm.controls['from'].value, this.filterForm.controls['to'].value).subscribe((jobs) => {
                this.jobsInTimespan = jobs;
                this.filterJobs();
            });
        });
        this.filterForm.controls['to'].valueChanges.subscribe(() => {
            this.jobApiService.getJobsInTimespan(this.filterForm.controls['from'].value, this.filterForm.controls['to'].value).subscribe((jobs) => {
                this.jobsInTimespan = jobs;
                this.filterJobs();
            });
        });
        this.filterForm.controls['search'].valueChanges.pipe(
            debounceTime(500)
        ).subscribe((newSearch: string) => {
            this.searchString = newSearch;
            this.filterJobs();
        });
        this.filterForm.controls['sort'].valueChanges.subscribe((newSortMode: string) => {
            this.sortJobsByProperty(newSortMode, this.sortDirectionAsc);
            this.filterJobs(false);
        });
        this.filterForm.controls['filterOpen'].valueChanges.subscribe(() => {
            this.filterJobs();
        });
        this.filterForm.controls['filterOverdue'].valueChanges.subscribe(() => {
            this.filterJobs();
        });
        this.filterForm.controls['filterClosed'].valueChanges.subscribe(() => {
            this.filterJobs();
        });
    }

    private bindRouteQueryParamChanges() {
        this.activatedRoute.queryParams.subscribe((updatedParams) => {
            this.filterForm.controls['filterOpen'].setValue(updatedParams.filterOpen === "true" ? true : false);
            this.filterForm.controls['filterOverdue'].setValue(updatedParams.filterOverdue === "true" ? true : false);
        });
    }

    private filterJobs(resetPage = true): void {
        const filterOpen = this.filterForm.controls['filterOpen'].value;
        const filterClosed = this.filterForm.controls['filterClosed'].value;
        const filterOverdue = this.filterForm.controls['filterOverdue'].value;
        this.jobsInTimespanFiltered = [];

        this.jobsInTimespan.forEach((job: Job) => {
            if ((
                job.id.toLowerCase().includes(this.searchString.toLowerCase()) ||
                job.description.toLowerCase().includes(this.searchString.toLowerCase()) ||
                job.externalPurchase.toLowerCase().includes(this.searchString.toLowerCase()) ||
                job.notes.toLowerCase().includes(this.searchString.toLowerCase()) ||
                job.customer.name.toLowerCase().includes(this.searchString.toLowerCase())) &&
                (!filterOpen || filterOpen && !job.isClosed()) &&
                (!filterClosed || filterClosed && job.isClosed()) &&
                (!filterOverdue || filterOverdue && job.isOverdue() && !job.isClosed())
            ) {
                this.jobsInTimespanFiltered.push({opened: !_.isEmpty(this.searchString), job: job});
            }
        });

        this.paginator.pageIndex === 0 || !resetPage ? this.updatePage(null, resetPage) : this.paginator.firstPage();
    }

    private sortJobsByProperty(property: string, asc = false): void {
        this.jobsInTimespan.sort((a: Job, b: Job) => {
            if (a[property] === b[property]) {
                return 0;
            } else if ((!asc && a[property] > b[property]) || (asc && a[property] < b[property])) {
                return -1;
            } else {
                return 1
            }
        });
    }

    public toggleSortDirection(): void {
        this.sortDirectionAsc = !this.sortDirectionAsc;
        this.sortJobsByProperty(this.filterForm.controls['sort'].value, this.sortDirectionAsc);
        this.filterJobs(false);
    }

    public updatePage(pageEvent?: PageEvent, gotoFirstPage = false) {
        const pageIndexToUse = gotoFirstPage ? 0 : pageEvent && pageEvent.pageIndex || this.paginator.pageIndex;
        const pageSizeToUse = pageEvent && pageEvent.pageSize || this.paginator.pageSize;
        this.jobsInTimespanFilteredPaged = this.jobsInTimespanFiltered.slice(
            pageIndexToUse * pageSizeToUse, (pageIndexToUse + 1) * pageSizeToUse
        );
    }

    public showJobDetails(job: Job): void {
        this.router.navigate(['/jobs', job.id, 'details']);
    }

    public showTaskFormDialog(job: Job): void {
        this.jobService.showTaskFormDialog(job).subscribe((data) => {
            if (data) {
                this.updateTaskTable.next();
            }
        }, () => {});
    }
}
