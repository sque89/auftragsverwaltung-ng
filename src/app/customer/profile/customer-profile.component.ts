import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {UiService} from '../../core/services/ui.service';
import {NotificationService} from '../../core/services/notification.service';
import {MatDialog} from '@angular/material';
import {CancelDialogComponent} from '../../shared/dialogs/cancel/cancel-dialog.component';
import {Customer} from '../../core/models/customer.model';
import {CustomerApiService} from '../../core/services/customer-api.service';

@Component({
    selector: 'customer-profile',
    templateUrl: './customer-profile.component.html',
    styleUrls: ['./customer-profile.component.scss']
})
export class CustomerProfileComponent implements OnInit {
    private currentCustomer: Customer;
    public form: FormGroup;
    public editMode: boolean;

    public constructor(
        private activatedRoute: ActivatedRoute,
        private uiService: UiService,
        private notificationService: NotificationService,
        private dialogService: MatDialog,
        private router: Router,
        private customerApiService: CustomerApiService
    ) {}

    public ngOnInit() {
        this.currentCustomer = this.activatedRoute.snapshot.data.CustomerProfileResolver;
        this.editMode = this.activatedRoute.snapshot.data.editMode;

        this.form = new FormGroup({
            name: new FormControl(
                {value: this.currentCustomer.name, disabled: !this.editMode},
                [Validators.required]
            ),
            postcode: new FormControl(
                {value: this.currentCustomer.postcode, disabled: !this.editMode},
                [Validators.required]
            ),
            city: new FormControl(
                {value: this.currentCustomer.city, disabled: !this.editMode},
                [Validators.required]
            ),
            address: new FormControl(
                {value: this.currentCustomer.address, disabled: !this.editMode},
                [Validators.required]
            ),
            contactPerson: new FormControl(
                {value: this.currentCustomer.contactPerson, disabled: !this.editMode},
                [Validators.required]
            ),
            mail: new FormControl(
                {value: this.currentCustomer.mail, disabled: !this.editMode},
                [Validators.required]
            ),
            phone: new FormControl(
                {value: this.currentCustomer.phone, disabled: !this.editMode},
                [Validators.required]
            ),
            fax: new FormControl(
                {value: this.currentCustomer.fax, disabled: !this.editMode},
                [Validators.required]
            )
        });
    }

    public askForCancel() {
        const dialogRef = this.dialogService.open(CancelDialogComponent, {
            height: '200px',
            width: '400px',
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.router.navigate(['../details'], {relativeTo: this.activatedRoute});
            }
        });
    }

    public save() {
        this.currentCustomer.name = this.form.get('name').value;
        this.currentCustomer.postcode = this.form.get('postcode').value;
        this.currentCustomer.city = this.form.get('city').value;
        this.currentCustomer.address = this.form.get('address').value;
        this.currentCustomer.contactPerson = this.form.get('contactPerson').value;
        this.currentCustomer.mail = this.form.get('mail').value;
        this.currentCustomer.phone = this.form.get('phone').value;
        this.currentCustomer.fax = this.form.get('fax').value;
        this.customerApiService.changeCustomerById(this.currentCustomer).subscribe(() => {
            this.router.navigate(['../details'], {relativeTo: this.activatedRoute});
            this.uiService.hideLoadingOverlay();
            this.notificationService.showSuccess('Daten erfolgreich geändert!');
        }, () => {
            this.uiService.hideLoadingOverlay();
            this.notificationService.showError('Datenänderung fehlgeschlagen!');
        });
    }
}
