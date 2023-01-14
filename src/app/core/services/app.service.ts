import {Injectable} from '@angular/core';
import {Setting} from '../models/setting.model';
import {SettingApiService} from './setting-api.service';
import {UiService} from './ui.service';
import {DeliveryTypeApiService} from './delivery-type-api.service';
import {DeliveryType} from '../models/delivery-type.model';

@Injectable({providedIn: 'root'})
export class AppService {
    private settings: Array<Setting>;
    private deliveryTypes: Array<DeliveryType>;

    public constructor(private settingApi: SettingApiService, private deliveryTypeApi: DeliveryTypeApiService, private uiService: UiService) {
        this.settings = [];
        this.deliveryTypes = [];
    }

    public initialize(): Promise<any> {
        return Promise.all([
            new Promise((resolve, reject) => {
                this.settingApi.loadSettings().subscribe((response: any) => {
                    this.uiService.hideLoadingOverlay();
                    this.settings = response;
                    resolve(null);
                }, (error) => {
                    reject(error);
                });
            }),
            new Promise((resolve, reject) => {
                this.deliveryTypeApi.fetchAll().subscribe((response: any) => {
                    this.uiService.hideLoadingOverlay();
                    this.deliveryTypes = response;
                    resolve(null);
                }, (error) => {
                    reject(error);
                });
            })
        ]);
    }

    public getSettings(): Array<Setting> {
        return this.settings;
    }

    public getSettingById(id: string): Setting {
        return this.settings.find(setting => { return setting.id === id });
    }

    public getDeliveryTypes(): Array<DeliveryType> {
        return this.deliveryTypes;
    }

    public getDeliveryTypeById(id: number): DeliveryType {
        return this.deliveryTypes.find(deliveryType => { return deliveryType.id === id; })
    }
}