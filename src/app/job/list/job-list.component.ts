import {Component, ViewChild, OnInit} from '@angular/core';
import {Job} from '../../core/models/job.model';
import {UiService} from '../../core/services/ui.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AppService} from '../../core/services/app.service';
import {FormGroup, FormControl} from '@angular/forms';
import {JobApiService} from '../../core/services/job-api.service';
import {JobFilterService} from '../services/job-filter.service';
import {debounceTime} from 'rxjs/operators';
import {Subject, merge} from 'rxjs';
import {JobService} from '../services/job.service';
import * as _ from 'lodash';
import * as moment from 'moment'
import {Moment} from 'moment';
import {PageEvent, MatPaginator} from '@angular/material';
import {SessionService} from '../../core/services/session.service';

@Component({
    selector: 'job-list',
    templateUrl: './job-list.component.html',
    styleUrls: ['./job-list.component.scss']
})
export class JobListComponent implements OnInit {
    public jobsInTimespanFiltered: Array<{opened: boolean, job: Job}>;
    public jobsInTimespanFilteredPaged: Array<{opened: boolean, job: Job}>;

    public filterForm: FormGroup;

    @ViewChild('paginator')
    private paginator: MatPaginator;
    public pageSize = this.appService.getSettingById('job_list_jobs_per_page').value;
    public pageSizeOptions: number[] = [10, 25, 50];

    public updateTaskTable: Subject<void>;

    public constructor(
        private uiService: UiService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private appService: AppService,
        private jobApiService: JobApiService,
        private jobFilterService: JobFilterService,
        public jobService: JobService,
        public sessionService: SessionService
    ) {
        this.jobsInTimespanFiltered = [];
        this.jobsInTimespanFilteredPaged = [];
        this.updateTaskTable = new Subject();
    }

    public ngOnInit() {
        this.uiService.closeMainMenu();
        this.jobFilterService.jobsInTimespan = this.activatedRoute.snapshot.data.JobListResolver;
        this.filterForm = new FormGroup({
            from: new FormControl(this.jobFilterService.filterFrom),
            to: new FormControl(this.jobFilterService.filterTo),
            search: new FormControl(this.jobFilterService.searchString),
            sortColumn: new FormControl(this.jobFilterService.sortColumn),
            filterOpen: new FormControl(),
            filterClosed: new FormControl(this.jobFilterService.filterClosed),
            filterOverdue: new FormControl(this.jobFilterService.filterOverdue)
        });

        this.bindRouteQueryParamChanges();
        this.bindFilterChanges();

        this.filterForm.controls['filterOpen'].setValue(this.jobFilterService.filterOpen);
        this.sortJobsByProperty('id', this.jobFilterService.sortDirectionAsc);
        this.filterJobs();

        this.paginator.initialized.subscribe(() => {
            this.updatePage();
        });
    }

    private bindFilterChanges() {
        const controls = this.filterForm.controls;

        merge(controls['from'].valueChanges, controls['to'].valueChanges).subscribe(() => {
            this.jobFilterService.filterFrom = moment(this.filterForm.controls['from'].value);
            this.jobFilterService.filterTo = moment(this.filterForm.controls['to'].value);
            this.jobApiService.getJobsInTimespan(this.jobFilterService.filterFrom, this.jobFilterService.filterTo).subscribe((jobs) => {
                this.jobFilterService.jobsInTimespan = jobs;
                this.filterJobs();
            });
        });

        controls['search'].valueChanges.pipe(
            debounceTime(500)
        ).subscribe((newSearch: string) => {
            this.jobFilterService.searchString = newSearch;
            this.filterJobs();
        });

        controls['sortColumn'].valueChanges.subscribe((newSortColumn: string) => {
            this.jobFilterService.sortColumn = newSortColumn;
            this.sortJobsByProperty(this.jobFilterService.sortColumn, this.jobFilterService.sortDirectionAsc);
            this.filterJobs(false);
        });

        merge(controls['filterOpen'].valueChanges, controls['filterOverdue'].valueChanges, controls['filterClosed'].valueChanges).subscribe(() => {
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
        const searchStrings: Array<{searchString: string, found: boolean}> = [];
        this.jobFilterService.filterOpen = this.filterForm.controls['filterOpen'].value;
        this.jobFilterService.filterClosed = this.filterForm.controls['filterClosed'].value;
        this.jobFilterService.filterOverdue = this.filterForm.controls['filterOverdue'].value;
        this.jobsInTimespanFiltered = [];

        if (this.jobFilterService.searchString.startsWith('"') && this.jobFilterService.searchString.endsWith('"')) {
            searchStrings.push({searchString: this.jobFilterService.searchString.replace(/\"/g, ''), found: false});
        } else {
            this.jobFilterService.searchString.split(' ').forEach(part => searchStrings.push({searchString: part, found: false}));
        }

        this.jobFilterService.jobsInTimespan.forEach((job: Job) => {
            searchStrings.forEach((single) => {
                if ((
                    job.id.toLowerCase().includes(single.searchString.toLowerCase()) ||
                    job.description.toLowerCase().includes(single.searchString.toLowerCase()) ||
                    job.externalPurchase.toLowerCase().includes(single.searchString.toLowerCase()) ||
                    job.notes.toLowerCase().includes(single.searchString.toLowerCase()) ||
                    job.customer.name.toLowerCase().includes(single.searchString.toLowerCase()) ||
                    job.customer.id.toString().includes(single.searchString.toLowerCase())) &&
                    (!this.jobFilterService.filterOpen || this.jobFilterService.filterOpen && !job.isClosed()) &&
                    (!this.jobFilterService.filterClosed || this.jobFilterService.filterClosed && job.isClosed()) &&
                    (!this.jobFilterService.filterOverdue || this.jobFilterService.filterOverdue && job.isOverdue() && !job.isClosed())
                ) {
                    single.found = true;
                }
            });

            if (_.every(searchStrings, {found: true})) {
                this.jobsInTimespanFiltered.push({opened: false, job: job});
            }
            searchStrings.map(searchString => searchString.found = false);
        });

        this.paginator.pageIndex === 0 || !resetPage ? this.updatePage(null, resetPage) : this.paginator.firstPage();
    }

    private sortJobsByProperty(property: string, asc = false): void {
        this.jobFilterService.jobsInTimespan.sort((a: Job, b: Job) => {
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
        this.jobFilterService.sortDirectionAsc = !this.jobFilterService.sortDirectionAsc;
        this.sortJobsByProperty(this.filterForm.controls['sortColumn'].value, this.jobFilterService.sortDirectionAsc);
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
