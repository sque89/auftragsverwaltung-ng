import {Component, OnInit, EventEmitter, Input, Output, ViewChild, AfterViewInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Job} from '../../core/models/job.model';
import {NumberService} from '../../core/services/number.service';
import {Task} from '../../core/models/task.model';
import {Subject} from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import {JobService} from '../services/job.service';
import {SessionService} from '../../core/services/session.service';
import {InvoiceDialogComponent} from '../dialogs/invoice/invoice-dialog.component';
import {JobApiService} from '../../core/services/job-api.service';
import {NotificationService} from '../../core/services/notification.service';
import {ActionButton} from '../../shared/content/action-headline/actionButton.model';

@Component({
    selector: 'job-detail',
    templateUrl: './job-detail.component.html',
    styleUrls: ['./job-detail.component.scss']
})
export class JobDetailComponent implements OnInit, AfterViewInit {
    @ViewChild(MatTable, { static: true }) taskTable: MatTable<Task>;

    public job: Job;
    public gotoEditHappened: EventEmitter<null>;
    public openTaskFormDialogHappened: EventEmitter<null>;
    public openInvoiceFormDialogHappened: EventEmitter<null>;

    public headlineActions: Array<ActionButton>;

    @Input() inputJob: Job;
    @Input() summaryMode: boolean;
    @Input() textToHighlight: string;
    @Input() updateTaskTable: Subject<void>;

    @Output() taskEditHappened: EventEmitter<Task>;

    public constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private jobService: JobService,
        private dialog: MatDialog,
        private jobApiService: JobApiService,
        private notificationService: NotificationService,
        public numberService: NumberService,
        public sessionService: SessionService
    ) {
        this.job = Job.fromVoid();
        this.gotoEditHappened = new EventEmitter();
        this.openTaskFormDialogHappened = new EventEmitter();
        this.taskEditHappened = new EventEmitter();
        this.openInvoiceFormDialogHappened = new EventEmitter();
        this.headlineActions = [];
    }

    public ngOnInit() {
        if (this.activatedRoute.snapshot.data.JobSingleResolver) {
            this.job = Job.fromObject(this.activatedRoute.snapshot.data.JobSingleResolver);
        } else {
            this.job = this.inputJob;
        }
        this.gotoEditHappened.subscribe(() => this.router.navigate(['..', 'bearbeiten'], {relativeTo: this.activatedRoute}));
        this.openTaskFormDialogHappened.subscribe(() => this.showTaskFormDialog());
        this.openInvoiceFormDialogHappened.subscribe(() => this.showInvoiceDialog());

        if (!this.job.isClosed() || this.sessionService.getUser().isAdministrator()) {
            this.headlineActions.push({action: this.gotoEditHappened, color: 'primary', title: 'Bearbeiten', icon: 'edit'});
        }
        if (!this.job.isClosed()) {
            this.headlineActions.push({action: this.openTaskFormDialogHappened, color: 'primary', title: 'Zeit buchen', icon: 'playlist_add'});
        }
        if (this.sessionService.getUser().isAdministrator() && !this.job.isClosed()) {
            this.headlineActions.push({action: this.openInvoiceFormDialogHappened, color: 'primary', title: 'Rechnung setzen', icon: 'attach_money'});
        }
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

    public showInvoiceDialog(): void {
        const dialogRef = this.dialog.open(InvoiceDialogComponent, {
            width: '50%',
            data: null
        });

        dialogRef.afterClosed().subscribe((invoiceNumber) => {
            if (invoiceNumber) {
                this.jobApiService.setInvoiceNumber(this.job, invoiceNumber).subscribe((jobWithInvoiceNumber) => {
                    this.job = jobWithInvoiceNumber;
                    this.notificationService.showSuccess('Rechnung wurde gebucht.');
                }, (error) => {
                    if (error.status === 423) {
                        this.notificationService.showError('Der Datensatz wurde in der Zwischenzeit geändert. Bitte Eingaben merken und Datensatz neu laden.');
                    } else {
                        this.notificationService.showError('Es ist ein Fehler beim buchen der Rechnung aufgetreten.');
                    }
                });
            }
        });
    }
}
