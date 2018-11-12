import {Component, OnInit, EventEmitter, Input, Output, ViewChild, AfterViewInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Job} from '../../core/models/job.model';
import {NumberService} from '../../core/services/number.service';
import {Task} from '../../core/models/task.model';
import {Observable, Subject} from 'rxjs';
import {MatTable} from '@angular/material';
import {JobService} from '../job.service';
import {SessionService} from '../../core/services/session.service';

@Component({
    selector: 'job-detail',
    templateUrl: './job-detail.component.html',
    styleUrls: ['./job-detail.component.scss']
})
export class JobDetailComponent implements OnInit, AfterViewInit {
    @ViewChild(MatTable) taskTable: MatTable<Task>;

    public job: Job;
    public gotoEditHappened: EventEmitter<null>;
    public openTaskFormDialogHappened: EventEmitter<null>;

    @Input() inputJob: Job;
    @Input() summaryMode: boolean;
    @Input() textToHighlight: string;
    @Input() updateTaskTable: Subject<void>;

    @Output() taskEditHappened: EventEmitter<Task>;

    public constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        public numberService: NumberService,
        private jobService: JobService,
        public sessionService: SessionService
    ) {
        this.job = Job.fromVoid();
        this.gotoEditHappened = new EventEmitter();
        this.openTaskFormDialogHappened = new EventEmitter();
        this.taskEditHappened = new EventEmitter();
    }

    public ngOnInit() {
        if (this.activatedRoute.snapshot.data.JobSingleResolver) {
            this.job = Job.fromObject(this.activatedRoute.snapshot.data.JobSingleResolver);
        } else {
            this.job = this.inputJob;
        }
        this.gotoEditHappened.subscribe(() => this.router.navigate(['..', 'bearbeiten'], {relativeTo: this.activatedRoute}));
        this.openTaskFormDialogHappened.subscribe(() => this.showTaskFormDialog());
    }

    public ngAfterViewInit() {
        this.updateTaskTable && this.updateTaskTable.subscribe(() => this.taskTable.renderRows());
    }

    public showTaskFormDialog(task?: Task): void {
        this.jobService.showTaskFormDialog(this.job, task).subscribe((data) => {
            if (data) {
                this.taskTable.renderRows();
            }
        }, () => {});
    }
}
