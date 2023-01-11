import {Component, OnInit, EventEmitter} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Job} from '../../core/models/job.model';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {CancelDialogComponent} from '../../shared/dialogs/cancel/cancel-dialog.component';
import {AppService} from '../../core/services/app.service';
import {DeliveryType} from '../../core/models/delivery-type.model';
import {CustomerApiService} from '../../core/services/customer-api.service';
import {Observable} from 'rxjs';
import {Customer} from '../../core/models/customer.model';
import {debounceTime, switchMap, filter} from 'rxjs/operators';
import * as _ from 'lodash';
import {UiService} from '../../core/services/ui.service';
import {NotificationService} from '../../core/services/notification.service';
import {JobApiService} from '../../core/services/job-api.service';
import {User} from '../../core/models/user.model';
import {UserApiService} from '../../core/services/user-api.service';

@Component({
    selector: 'job-form',
    templateUrl: './job-form.component.html',
    styleUrls: ['./job-form.component.scss']
})
export class JobFormComponent implements OnInit {
    public job: Job;
    public form: FormGroup;
    public customers$: Observable<Array<Customer>>;
    public users$: Observable<Array<User>>;
    public createNew: boolean;
    public discardHappened: EventEmitter<null>;

    public constructor(
        private jobApiService: JobApiService,
        private customerApiService: CustomerApiService,
        private userApiService: UserApiService,
        private activatedRoute: ActivatedRoute,
        private uiService: UiService,
        private notificationService: NotificationService,
        private router: Router,
        private dialogService: MatDialog,
        public appService: AppService
    ) {
        this.job = Job.fromVoid();
        this.customers$ = null;
        this.users$ = this.userApiService.getAllUsersUnsensitive();
        this.createNew = false;
        this.discardHappened = new EventEmitter();
    }

    public ngOnInit() {
        this.createNew = this.activatedRoute.snapshot.data.createNew || false;
        if (!this.createNew) {
            this.job = this.activatedRoute.snapshot.data.JobSingleResolver;
        }
        this.form = new FormGroup({
            dateIncoming: new FormControl(this.job.dateIncoming, [Validators.required]),
            dateDeadline: new FormControl(this.job.dateDeadline),
            customer: new FormControl(this.job.customer, [Validators.required]),
            deliveryType: new FormControl(this.job.deliveryType, [Validators.required]),
            description: new FormControl(this.job.description, [Validators.required]),
            notes: new FormControl(this.job.notes),
            externalPurchase: new FormControl(this.job.externalPurchase),
            arrangers: new FormControl(this.job.arrangers, [Validators.required])
        });

        this.customers$ = this.form.controls['customer'].valueChanges.pipe(
            debounceTime(500),
            filter(searchString => _.isString(searchString) && !_.isEmpty(searchString)),
            switchMap(searchString => this.customerApiService.getCustomersBySearchString(searchString, true))
        );

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

    private updateJobWithFormValues() {
        this.job.dateIncoming = this.form.get('dateIncoming').value;
        this.job.dateDeadline = this.form.get('dateDeadline').value;
        this.job.customer = this.form.get('customer').value;
        this.job.deliveryType = this.form.get('deliveryType').value;
        this.job.description = this.form.get('description').value;
        this.job.notes = this.form.get('notes').value;
        this.job.externalPurchase = this.form.get('externalPurchase').value;
        this.job.arrangers = this.form.get('arrangers').value;
    }

    private onSaveSuccess(routeConfig: Array<any>, message: string) {
        this.router.navigate(routeConfig, {relativeTo: this.activatedRoute});
        this.uiService.hideLoadingOverlay();
        this.notificationService.showSuccess(message);
    }

    private onSaveFailure(message: string) {
        this.uiService.hideLoadingOverlay();
        this.notificationService.showError(message);
    }

    public save() {
        this.updateJobWithFormValues();
        if (this.createNew) {
            this.jobApiService.createJob(this.job).subscribe(
                (createdJob) => {this.onSaveSuccess(['..', createdJob.id, 'details'], 'Job wurde erstellt');},
                () => this.onSaveFailure('Beim Erstellen des Jobs ist ein Fehler aufgetreten!')
            );
        } else {
            this.jobApiService.changeJobById(this.job).subscribe(
                () => this.onSaveSuccess(['../details'], 'Daten erfolgreich geändert!'),
                (error) => {
                    if (error.status === 423) {
                        this.onSaveFailure('Der Datensatz wurde in der Zwischenzeit geändert. Bitte Eingaben merken und Datensatz neu laden');
                    } else {
                        this.onSaveFailure('Datenänderung fehlgeschlagen!');
                    }
                }
            );
        }
    }

    public compareDeliveryTypes(typeOne: DeliveryType, typeTwo: DeliveryType) {
        return typeOne && typeTwo && typeOne.id === typeTwo.id;
    }

    public compareUsers(userOne: User, userTwo: User) {
        return userOne && userTwo && userOne.username === userTwo.username;
    }

    public customerAutocompleteDisplay(customer?: Customer) {
        return customer ? customer.name : undefined;
    }
}
