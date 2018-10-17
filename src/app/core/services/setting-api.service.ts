import {environment} from '../../../environments/environment';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Setting} from '../models/setting.model';
import {Observable} from 'rxjs';
import {UiService} from './ui.service';
import {tap} from 'rxjs/operators';

@Injectable()
export class SettingApiService {
    public constructor(private http: HttpClient, private uiService: UiService) {}

    public loadSettings(): Observable<Array<Setting>> {
        return this.http.get<Array<Setting>>(`${environment.apiUrl}/settings`);
    }

    public saveSettings(settings: Array<Setting>): Observable<Array<Setting>> {
        this.uiService.showLoadingOverlay();
        return this.http.post<Array<Setting>>(`${environment.apiUrl}/settings`, settings).pipe(
            tap(() => this.uiService.hideLoadingOverlay())
        );
    }
}

