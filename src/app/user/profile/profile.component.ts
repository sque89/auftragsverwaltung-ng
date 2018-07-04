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

    public constructor(
        private activatedRoute: ActivatedRoute,
        private userApiService: UserApiService,
        private uiService: UiService,
        private notificationService: NotificationService,
        private dialogService: MatDialog,
        private router: Router,
        private sessionService: SessionService
    ) {}

    public ngOnInit() {
        this.currentUser = this.activatedRoute.snapshot.data.ProfileResolver;
        this.isOwnProfile = this.activatedRoute.snapshot.data.isOwnProfile;
        this.editMode = this.activatedRoute.snapshot.data.editMode;

        this.commonDataForm = new FormGroup({
            firstname: new FormControl(
                {value: this.currentUser.firstname, disabled: !this.editMode},
                [Validators.required]
            ),
            lastname: new FormControl(
                {value: this.activatedRoute.snapshot.data.ProfileResolver.lastname, disabled: !this.editMode},
                [Validators.required]
            ),
            mail: new FormControl(
                {value: this.activatedRoute.snapshot.data.ProfileResolver.email, disabled: !this.editMode},
                [Validators.required]
            )
        });

        if (this.isOwnProfile) {
            this.passwordForm = new FormGroup({
                currentPassword: new FormControl(
                    '',
                    [Validators.required]
                ),
                newPassword: new FormControl(
                    '',
                    [Validators.required]
                ),
                newPasswordConfirmation: new FormControl(
                    '',
                    [Validators.required]
                )
            });
        } else {
            this.passwordForm = new FormGroup({
                newPassword: new FormControl(
                    {value: '', disabled: !this.editMode},
                    [Validators.required]
                )
            });
        }
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

    public saveCommonData() {
        // TODO implement actication status and role
        this.uiService.showLoadingOverlay();
        this.userApiService.changeCommonUserData(
            this.commonDataForm.get('firstname').value,
            this.commonDataForm.get('lastname').value,
            this.commonDataForm.get('mail').value,
            this.isOwnProfile ? null : this.currentUser.username
        ).subscribe((updatedUser) => {
            if (this.isOwnProfile) {
                this.sessionService.setCurrentUser(updatedUser);
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
        }, () => {
            this.uiService.hideLoadingOverlay();
            this.notificationService.showError('Passwortänderung fehlgeschlagen!');
        });
    }
}
