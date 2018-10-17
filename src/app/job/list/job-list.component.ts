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
    styleUrls: ['./job-list.component.scss'],
    animations: [
        trigger('taskExpand', [
            state('collapsed', style({height: '0px', minHeight: '0', visibility: 'hidden'})),
            state('expanded', style({height: '*', visibility: 'visible'})),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ]
})
export class JobListComponent {
    public jobs: MatTableDataSource<Job | {taskRow: boolean, job: Job}>;
    public columnsToDisplay: string[] = ['id', 'dateIncoming', 'dateDeadline', 'deliveryType', 'arrangers', 'description', 'externalPurchase', 'invoiceNumber'];
    public pageSize = 10;
    public pageSizeOptions: number[] = [5, 10, 25, 100];
    public isTaskRow = (i: number, row: Job | {taskRow: boolean, job: Job}) => row.hasOwnProperty('taskRow');
    public expandedJob: Job;
    public timespanForm: FormGroup;

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    public constructor(
        private uiService: UiService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private appService: AppService,
        private jobApiService: JobApiService
    ) {}

    public ngOnInit() {
        this.setJobDataSource(this.activatedRoute.snapshot.data.JobListResolver);
        this.jobs.sort = this.sort;
        this.jobs.paginator = this.paginator;
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
                this.setJobDataSource(jobs);
            });
        });
    }

    private setJobDataSource(jobs: Array<Job>) {
        const jobDataSource: Array<Job | {taskRow: boolean, job: Job}> = [];
        jobs.forEach((job: Job) => jobDataSource.push(job, {taskRow: true, job: job}));
        this.jobs = new MatTableDataSource(jobDataSource);
    }

    public applyFilter(filterValue: string) {
        this.jobs.filter = filterValue.trim().toLowerCase();
    }

    public showJobDetails(job: Job) {
        this.router.navigate(['/jobs', job.id, 'details']);
    }
}
