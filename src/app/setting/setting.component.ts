import {Component, OnInit} from '@angular/core';
import {AppService} from '../core/services/app.service';
import {Setting} from '../core/models/setting.model';
import {SettingApiService} from '../core/services/setting-api.service';
import {NotificationService} from '../core/services/notification.service';
import {UiService} from '../core/services/ui.service';

@Component({
    selector: 'setting',
    templateUrl: './setting.component.html',
    styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
    public settings: Array<Setting>;

    public constructor(
        appService: AppService,
        private settingsApiService: SettingApiService,
        private notificationService: NotificationService,
        private uiService: UiService
    ) {
        this.settings = appService.getSettings();
    }

    public ngOnInit() {
        this.uiService.closeMainMenu();
    }

    public save(): void {
        this.settingsApiService.saveSettings(this.settings).subscribe((response) => {
            this.notificationService.showSuccess('Einstellungen wurden erfolgreich gespeichert');
        }, (error) => {
            this.notificationService.showError('Es ist ein Fehler aufgetreten');
        });
    }
}
