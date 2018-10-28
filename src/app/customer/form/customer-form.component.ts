import {Component, OnInit, EventEmitter} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {UiService} from '../../core/services/ui.service';
import {NotificationService} from '../../core/services/notification.service';
import {MatDialog} from '@angular/material';
import {CancelDialogComponent} from '../../shared/dialogs/cancel/cancel-dialog.component';
import {Customer} from '../../core/models/customer.model';
import {CustomerApiService} from '../../core/services/customer-api.service';

@Component({
    selector: 'customer-form',
    templateUrl: './customer-form.component.html',
    styleUrls: ['./customer-form.component.scss']
})
export class CustomerFormComponent implements OnInit {
    private customer: Customer;
    public form: FormGroup;
    public createNew: boolean;
    public discardHappened: EventEmitter<null>;

    public constructor(
        private activatedRoute: ActivatedRoute,
        private uiService: UiService,
        private notificationService: NotificationService,
        private dialogService: MatDialog,
        private router: Router,
        private customerApiService: CustomerApiService
    ) {
        this.customer = {
            id: null,
            name: '',
            postcode: '',
            city: '',
            address: '',
            contactPerson: '',
            mail: '',
            phone: '',
            fax: ''
        };
        this.discardHappened = new EventEmitter();
    }

    public ngOnInit() {
        this.createNew = this.activatedRoute.snapshot.data.createNew;
        if (!this.createNew) {
            this.customer = this.activatedRoute.snapshot.data.CustomerSingleResolver;
        }

        this.discardHappened.subscribe(() => this.askForCancel());

        this.form = new FormGroup({
            name: new FormControl(this.customer.name, [Validators.required]),
            postcode: new FormControl(this.customer.postcode, [Validators.required]),
            city: new FormControl(this.customer.city, [Validators.required]),
            address: new FormControl(this.customer.address, [Validators.required]),
            contactPerson: new FormControl(this.customer.contactPerson, [Validators.required]),
            mail: new FormControl(this.customer.mail, [Validators.required]),
            phone: new FormControl(this.customer.phone, [Validators.required]),
            fax: new FormControl(this.customer.fax, [Validators.required])
        });
    }

    private updateCustomerWithFormValues() {
        this.customer.name = this.form.get('name').value;
        this.customer.postcode = this.form.get('postcode').value;
        this.customer.city = this.form.get('city').value;
        this.customer.address = this.form.get('address').value;
        this.customer.contactPerson = this.form.get('contactPerson').value;
        this.customer.mail = this.form.get('mail').value;
        this.customer.phone = this.form.get('phone').value;
        this.customer.fax = this.form.get('fax').value;
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

    public askForCancel() {
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

    public save() {
        this.updateCustomerWithFormValues();
        if (this.createNew) {
            this.customerApiService.addCustomer(this.customer).subscribe((addedCustomer) => {
                this.onSaveSuccess(['..', addedCustomer.id, 'details'], 'Kunde wurde erstellt');
            }, () => this.onSaveFailure('Beim Erstellen des Kunden ist ein Fehler aufgetreten!'));
        } else {
            this.customerApiService.changeCustomerById(this.customer).subscribe(() => {
                this.onSaveSuccess(['../details'], 'Daten erfolgreich geändert!');
            }, () => this.onSaveFailure('Datenänderung fehlgeschlagen!'));
        }
    }
}
