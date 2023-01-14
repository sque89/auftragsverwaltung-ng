import {Component, OnInit, EventEmitter} from '@angular/core';
import {UntypedFormGroup, UntypedFormControl, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../core/models/user.model';
import {UserApiService} from '../../core/services/user-api.service';
import {UiService} from '../../core/services/ui.service';
import {NotificationService} from '../../core/services/notification.service';
import {SessionService} from '../../core/services/session.service';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import {CancelDialogComponent} from '../../shared/dialogs/cancel/cancel-dialog.component';

import * as _ from 'lodash';

@Component({
    selector: 'user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
    public commonDataForm: UntypedFormGroup;
    public passwordForm: UntypedFormGroup;
    public user: User;
    public isOwnProfile: boolean;
    public createNew: boolean;
    public discardHappened: EventEmitter<null>;

    public constructor(
        private activatedRoute: ActivatedRoute,
        private userApiService: UserApiService,
        private uiService: UiService,
        private notificationService: NotificationService,
        private dialogService: MatDialog,
        private router: Router,
        private sessionService: SessionService
    ) {
        this.user = new User(null, '', '', '', '', null, [], true);
        this.discardHappened = new EventEmitter();
    }

    public ngOnInit() {
        if (!_.isEmpty(this.activatedRoute.snapshot.data.UserSingleResolver)) {
            this.user = this.activatedRoute.snapshot.data.UserSingleResolver;
        }
        this.isOwnProfile = this.activatedRoute.snapshot.data.isOwnProfile;
        this.createNew = this.activatedRoute.snapshot.data.createNew;

        this.discardHappened.subscribe(() => this.askForCancel());

        this.commonDataForm = new UntypedFormGroup({
            firstname: new UntypedFormControl(
                this.user.firstname,
                [Validators.required]
            ),
            lastname: new UntypedFormControl(
                this.user.lastname,
                [Validators.required]
            ),
            mail: new UntypedFormControl(
                this.user.email,
                [Validators.required]
            )
        });

        this.passwordForm = new UntypedFormGroup({
            newPassword: new UntypedFormControl(
                '',
                [Validators.required]
            )
        });

        if (this.isOwnProfile) {
            this.passwordForm.addControl(
                'currentPassword', new UntypedFormControl(
                    '',
                    [Validators.required]
                )
            );
            this.passwordForm.addControl(
                'newPasswordConfirmation', new UntypedFormControl(
                    '',
                    [Validators.required]
                )
            );
        } else {
            this.commonDataForm.addControl(
                'roles', new UntypedFormControl(
                    this.user.roles,
                    [Validators.required]
                )
            );
        }

        if (this.createNew) {
            this.commonDataForm.addControl(
                'password', new UntypedFormControl(
                    '',
                    [Validators.required]
                )
            );
            this.commonDataForm.addControl(
                'username', new UntypedFormControl(
                    '',
                    [Validators.required]
                )
            );
        }
    }

    public getHeadlineText() {
        let text = 'Benutzer hinzufügen';
        if (this.isOwnProfile) {
            text = 'Eigenes Profil bearbeiten';
        } else if (!this.isOwnProfile && !this.createNew) {
            text = 'Benutzer bearbeiten';
        }
        return text;
    }

    public askForCancel() {
        const dialogRef = this.dialogService.open(CancelDialogComponent, {
            height: '200px',
            width: '400px',
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result && this.isOwnProfile || this.createNew) {
                this.router.navigate(['..'], {relativeTo: this.activatedRoute});
            } else if (result && !this.createNew) {
                this.router.navigate(['..', 'details'], {relativeTo: this.activatedRoute});
            }
        });
    }

    public saveCommonData() {
        this.uiService.showLoadingOverlay();
        this.userApiService.changeCommonUserData(
            this.commonDataForm.get('firstname').value,
            this.commonDataForm.get('lastname').value,
            this.commonDataForm.get('mail').value,
            this.isOwnProfile ? this.user.roles : this.commonDataForm.get('roles').value,
            this.isOwnProfile ? null : this.user.username
        ).subscribe((updatedUser) => {
            if (this.isOwnProfile) {
                this.sessionService.setUser(updatedUser);
                this.router.navigate(['..'], {relativeTo: this.activatedRoute});
            } else {
                this.router.navigate(['../details'], {relativeTo: this.activatedRoute});
            }
            this.uiService.hideLoadingOverlay();
            this.notificationService.showSuccess('Daten erfolgreich geändert!');
        }, () => {
            this.uiService.hideLoadingOverlay();
            this.notificationService.showError('Datenänderung fehlgeschlagen!');
        });
    }

    public saveNewUser() {
        this.uiService.showLoadingOverlay();
        this.userApiService.addUser(
            this.commonDataForm.get('username').value,
            this.commonDataForm.get('firstname').value,
            this.commonDataForm.get('lastname').value,
            this.commonDataForm.get('mail').value,
            this.commonDataForm.get('roles').value,
            this.commonDataForm.get('password').value
        ).subscribe((updatedUser) => {
            if (this.isOwnProfile) {
                this.sessionService.setUser(updatedUser);
            } else {
                this.router.navigate(['/benutzer'], {relativeTo: this.activatedRoute});
            }
            this.uiService.hideLoadingOverlay();
            this.notificationService.showSuccess('Daten erfolgreich geändert!');
        }, () => {
            this.uiService.hideLoadingOverlay();
            this.notificationService.showError('Datenänderung fehlgeschlagen!');
        });
    }

    public savePassword() {
        this.uiService.showLoadingOverlay();
        this.userApiService.changePassword(
            this.passwordForm.get('newPassword').value,
            this.isOwnProfile ? this.passwordForm.get('currentPassword').value : null,
            this.isOwnProfile ? this.passwordForm.get('newPasswordConfirmation').value : null,
            this.isOwnProfile ? null : this.user.username
        ).subscribe(() => {
            this.uiService.hideLoadingOverlay();
            this.notificationService.showSuccess('Passwort erfolgreich geändert!');
            if (!this.isOwnProfile) {
                this.router.navigate(['../details'], {relativeTo: this.activatedRoute});
            }
        }, () => {
            this.uiService.hideLoadingOverlay();
            this.notificationService.showError('Passwortänderung fehlgeschlagen!');
        });
    }
}
