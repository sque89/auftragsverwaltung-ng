import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../core/models/user.model';
import {UserApiService} from '../../core/services/user-api.service';
import {UiService} from '../../core/services/ui.service';
import {NotificationService} from '../../core/services/notification.service';
import {SessionService} from '../../core/services/session.service';
import {MatDialog} from '@angular/material';
import {CancelDialogComponent} from '../../shared/dialogs/cancel/cancel-dialog.component';

@Component({
    selector: 'profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    public commonDataForm: FormGroup;
    public passwordForm: FormGroup;
    public currentUser: User;
    public isOwnProfile: boolean;
    public editMode: boolean;
    public createNew: boolean;

    public constructor(
        private activatedRoute: ActivatedRoute,
        private userApiService: UserApiService,
        private uiService: UiService,
        private notificationService: NotificationService,
        private dialogService: MatDialog,
        private router: Router,
        private sessionService: SessionService
    ) {
        this.currentUser = new User(null, '', '', '', '', [], true);
    }

    public ngOnInit() {
        if (this.activatedRoute.snapshot.data.ProfileResolver) {
            this.currentUser = this.activatedRoute.snapshot.data.ProfileResolver;
        }
        this.isOwnProfile = this.activatedRoute.snapshot.data.isOwnProfile;
        this.editMode = this.activatedRoute.snapshot.data.editMode;
        this.createNew = this.activatedRoute.snapshot.data.createNew;

        this.commonDataForm = new FormGroup({
            firstname: new FormControl(
                {value: this.currentUser.firstname, disabled: !this.editMode},
                [Validators.required]
            ),
            lastname: new FormControl(
                {value: this.currentUser.lastname, disabled: !this.editMode},
                [Validators.required]
            ),
            mail: new FormControl(
                {value: this.currentUser.email, disabled: !this.editMode},
                [Validators.required]
            )
        });

        this.passwordForm = new FormGroup({
            newPassword: new FormControl(
                {value: '', disabled: !this.editMode},
                [Validators.required]
            )
        });

        if (this.isOwnProfile) {
            this.passwordForm.addControl(
                'currentPassword', new FormControl(
                    '',
                    [Validators.required]
                )
            );
            this.passwordForm.addControl(
                'newPasswordConfirmation', new FormControl(
                    '',
                    [Validators.required]
                )
            );
        } else {
            this.commonDataForm.addControl(
                'roles', new FormControl(
                    {value: this.currentUser.roles, disabled: !this.editMode},
                    [Validators.required]
                )
            );
        }

        if (this.createNew) {
            this.commonDataForm.addControl(
                'password', new FormControl(
                    {value: '', disabled: !this.editMode},
                    [Validators.required]
                )
            );
            this.commonDataForm.addControl(
                'username', new FormControl(
                    {value: '', disabled: !this.editMode},
                    [Validators.required]
                )
            );
        }
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

    public saveCommonData() {
        this.uiService.showLoadingOverlay();
        this.userApiService.changeCommonUserData(
            this.commonDataForm.get('firstname').value,
            this.commonDataForm.get('lastname').value,
            this.commonDataForm.get('mail').value,
            this.commonDataForm.get('roles').value,
            this.isOwnProfile ? null : this.currentUser.username
        ).subscribe((updatedUser) => {
            if (this.isOwnProfile) {
                this.sessionService.setUser(updatedUser);
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
            this.isOwnProfile ? null : this.currentUser.username
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
