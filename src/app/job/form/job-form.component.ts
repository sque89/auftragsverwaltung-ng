import {Component, OnInit, EventEmitter} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Job} from '../../core/models/job.model';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material';
import {CancelDialogComponent} from '../../shared/dialogs/cancel/cancel-dialog.component';

@Component({
    selector: 'job-form',
    templateUrl: './job-form.component.html',
    styleUrls: ['./job-form.component.scss']
})
export class JobFormComponent implements OnInit {
    public job: Job;
    public form: FormGroup;
    public createNew: boolean;
    public discardHappened: EventEmitter<null>;

    public constructor(private activatedRoute: ActivatedRoute, private router: Router, private dialogService: MatDialog) {
        this.job = Job.fromVoid();
        this.createNew = false;
        this.discardHappened = new EventEmitter();
    }

    public ngOnInit() {
        this.job = this.activatedRoute.snapshot.data.JobSingleResolver;
        this.form = new FormGroup({
            dateIncoming: new FormControl(this.job.dateIncoming, [Validators.required]),
            dateDeadline: new FormControl(this.job.dateDeadline, [Validators.required]),
            deliveryType: new FormControl(this.job.deliveryType, [Validators.required]),
            description: new FormControl(this.job.description, [Validators.required]),
            notes: new FormControl(this.job.notes, [Validators.required]),
            externalPurchase: new FormControl(this.job.externalPurchase, [Validators.required]),
            invoiceNumber: new FormControl(this.job.invoiceNumber, [Validators.required]),
            arrangers: new FormControl(this.job.arrangers, [Validators.required])
        });

        this.discardHappened.subscribe(() => this.askForCancel());
    }

    private askForCancel() {
        const dialogRef = this.dialogService.open(CancelDialogComponent, {
            height: '200px',
            width: '400px',
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result && !this.createNew) {
                this.router.navigate(['../details'], {relativeTo: this.activatedRoute});
            } else if (result && this.createNew) {
                this.router.navigate(['../'], {relativeTo: this.activatedRoute});
            }
        });
    }
}
