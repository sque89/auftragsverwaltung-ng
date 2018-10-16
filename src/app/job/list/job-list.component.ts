import {Component, ViewChild} from '@angular/core';
import {Job} from '../../core/models/job.model';
import {MatTableDataSource, MatSort, MatPaginator} from '@angular/material';
import {UiService} from '../../core/services/ui.service';
import {ActivatedRoute, Router} from '@angular/router';
import {trigger, state, transition, style, animate} from '@angular/animations';

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
    public columnsToDisplay: string[] = ['id', 'dateIncoming', 'dateDeadline', 'deliveryType', 'arrangers', 'description', 'notes', 'externalPurchase', 'invoiceNumber'];
    public pageSize = 10;
    public pageSizeOptions: number[] = [5, 10, 25, 100];
    public isTaskRow = (i: number, row: Job | {taskRow: boolean, job: Job}) => row.hasOwnProperty('taskRow');
    public expandedJob: Job;

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    public constructor(private uiService: UiService, private activatedRoute: ActivatedRoute, private router: Router) {
    }

    public ngOnInit() {
        const jobDataSource: Array<Job | {taskRow: boolean, job: Job}> = [];
        this.activatedRoute.snapshot.data.JobListResolver.forEach((job: Job) => jobDataSource.push(job, { taskRow: true, job: job }));
        this.jobs = new MatTableDataSource(jobDataSource);
        this.jobs.sort = this.sort;
        this.jobs.paginator = this.paginator;
        this.uiService.closeMainMenu();
    }

    public applyFilter(filterValue: string) {
        this.jobs.filter = filterValue.trim().toLowerCase();
    }

    public showJobDetails(job: Job) {
        this.router.navigate(['/jobs', job.id, 'details']);
    }
}
