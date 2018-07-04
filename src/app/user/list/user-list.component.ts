import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {User} from '../../core/models/user.model';
import {UiService} from '../../core/services/ui.service';
import {UserApiService} from '../../core/services/user-api.service';
import {NotificationService} from '../../core/services/notification.service';
import {SessionService} from '../../core/services/session.service';
import {MatDialog, MatSlideToggleChange, MatSlideToggle} from '@angular/material';
import {DeletionConfirmationDialog} from '../../shared/dialogs/deletionConfirmation/deletion-confirmation-dialog.component';
import * as _ from 'lodash';

@Component({
    selector: 'user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
    @ViewChild('activateToggle') activateToggle: MatSlideToggle;

    public users: Array<User>;

    public constructor(
        private activatedRoute: ActivatedRoute,
        private uiService: UiService,
        private userApiService: UserApiService,
        private notificationService: NotificationService,
        private dialogService: MatDialog,
        public sessionService: SessionService
    ) {
        this.users = [];
    }

    public ngOnInit() {
        this.uiService.closeMainMenu();
        this.users = this.activatedRoute.snapshot.data.UserListResolver;
    }

    public deleteUser(username: string) {
        const dialogRef = this.dialogService.open(DeletionConfirmationDialog, {
            height: '250px',
            width: '400px',
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.userApiService.deleteUser(username).subscribe(() => {
                    _.remove(this.users, {username: username});
                    this.uiService.hideLoadingOverlay();
                    this.notificationService.showSuccess('Benutzer  gelöscht!');
                }, () => {
                    this.uiService.hideLoadingOverlay();
                    this.notificationService.showError('Löschen fehlgeschlagen!');
                });
            }
        });
    }

    public changeActivationStatus($event: MatSlideToggleChange, user: User) {
        this.uiService.showLoadingOverlay();
        if ($event.checked) {
            this.userApiService.activateUser(user.username).subscribe(changedUser => {
                this.uiService.hideLoadingOverlay();
                this.notificationService.showSuccess('Benutzer aktiviert!');
                user.isActive = changedUser.isActive;
            }, () => {
                this.uiService.hideLoadingOverlay();
                this.notificationService.showError('Aktivieren fehgeschlagen!');
                this.activateToggle.toggle();
            });
        } else {
            this.userApiService.deactivateUser(user.username).subscribe(changedUser => {
                this.uiService.hideLoadingOverlay();
                this.notificationService.showSuccess('Benutzer deaktiviert!');
                user.isActive = changedUser.isActive;
            }, () => {
                this.uiService.hideLoadingOverlay();
                this.notificationService.showError('Deaktivieren fehgeschlagen!');
                this.activateToggle.toggle();
            });
        }
    }
}
