import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {User} from '../../core/models/user.model';
import {UserApiService} from '../../core/services/user-api.service';
import {UiService} from '../../core/services/ui.service';
import {LocalStorageService} from '../../core/services/local-storage.service';
import {NotificationService} from '../../core/services/notification.service';
import {catchError} from 'rxjs/operators';

@Component({
    selector: 'profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    public commonDataForm: FormGroup;
    public passwordForm: FormGroup;
    public currentUser: User;

    public constructor(
        private activatedRoute: ActivatedRoute,
        private userApiService: UserApiService,
        private uiService: UiService,
        private localStorageService: LocalStorageService,
        private notificationService: NotificationService
    ) {}

    public ngOnInit() {
        this.currentUser = this.activatedRoute.snapshot.data.ProfileResolver;

        this.commonDataForm = new FormGroup({
            firstname: new FormControl(this.currentUser.firstname, [
                Validators.required
            ]),
            lastname: new FormControl(this.activatedRoute.snapshot.data.ProfileResolver.lastname, [
                Validators.required
            ]),
            mail: new FormControl(this.activatedRoute.snapshot.data.ProfileResolver.email, [
                Validators.required
            ])
        });

        this.passwordForm = new FormGroup({
            currentPassword: new FormControl('', [
                Validators.required
            ]),
            newPassword: new FormControl('', [
                Validators.required
            ]),
            newPasswordConfirmation: new FormControl('', [
                Validators.required
            ])
        });
    }

    public saveCommonData() {
        this.uiService.showLoadingOverlay();
        this.userApiService.changeCommonUserDataByUsername(
            this.localStorageService.getCurrentUsername(),
            this.commonDataForm.get('firstname').value,
            this.commonDataForm.get('lastname').value,
            this.commonDataForm.get('mail').value,
        ).subscribe(() => {
            this.uiService.hideLoadingOverlay();
            this.notificationService.showSuccess('Daten erfolgreich geändert!');
        }, () => {
            this.uiService.hideLoadingOverlay();
            this.notificationService.showError('Datenänderung fehlgeschlagen!');
        });
    }

    public savePassword() {
        this.uiService.showLoadingOverlay();
        this.userApiService.changePasswordByUsername(
            this.localStorageService.getCurrentUsername(),
            this.passwordForm.get('currentPassword').value,
            this.passwordForm.get('newPassword').value,
            this.passwordForm.get('newPasswordConfirmation').value
        ).subscribe(() => {
            this.uiService.hideLoadingOverlay();
            this.notificationService.showSuccess('Passwort erfolgreich geändert!');
        }, () => {
            this.uiService.hideLoadingOverlay();
            this.notificationService.showError('Passwortänderung fehlgeschlagen!');
        });
    }
}
