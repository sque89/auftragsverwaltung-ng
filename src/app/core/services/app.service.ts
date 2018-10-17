import {Injectable} from '@angular/core';
import {Setting} from '../models/setting.model';
import {SettingApiService} from './setting-api.service';
import {UiService} from './ui.service';

@Injectable({providedIn: 'root'})
export class AppService {
    private settings: Array<Setting>;

    public constructor(private settingApi: SettingApiService, private uiService: UiService) {
        this.settings = [];
    }

    public initialize(): Promise<Array<Setting>> {
        return new Promise((resolve, reject) => {
            this.settingApi.loadSettings().subscribe((response: any) => {
                this.uiService.hideLoadingOverlay();
                this.settings = response;
                resolve(this.settings);
            }, (error) => {
                reject(error);
            });
        });
    }

    public getSettings(): Array<Setting> {
        return this.settings;
    }

    public getSettingById(id: string): Setting {
        return this.settings.find(setting => {return setting.id === id});
    }
}