import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {User} from '../models/user.model';
import {UiService} from './ui.service';
import {Observable} from 'rxjs';

@Injectable()
export class UserApiService {
    public constructor(private http: HttpClient, private uiService: UiService) { }

    public getUserByUsername(username: string): Observable<User> {
        this.uiService.showLoadingOverlay();
        return this.http.get<User>(`${environment.apiUrl}/user/${username}`)
            .pipe(map((response:any) => {
                this.uiService.hideLoadingOverlay();
                return {
                    id: response.id,
                    username: response.username,
                    firstname: response.firstname,
                    lastname: response.lastname,
                    email: response.email,
                    roles: response.roles
                };
            }));
    }

    public getAllUsers() {
        this.uiService.showLoadingOverlay();
        return this.http.get<Array<User>>(`${environment.apiUrl}/users`)
            .pipe(map((response: any) => {
                this.uiService.hideLoadingOverlay();
                const users: Array<User> = [];
                response.users.forEach((user: any) => {
                    users.push({
                        id: user.id,
                        username: user.username,
                        firstname: user.firstname,
                        lastname: user.lastname,
                        email: user.email,
                        roles: user.roles
                    });
                });
                return users;
            }));
    }

    public changeCommonUserDataByUsername(
        username: string,
        firstname: string,
        lastname: string,
        email: string
    ) {
        return this.http.post(`${environment.apiUrl}/edit/user/commondata/${username}`, {
            firstname: firstname,
            lastname: lastname,
            email: email
        });
    }

    public changePasswordByUsername(username: string, currentPassword: string, newPassword: string, newPasswordConfirmation: string) {
        return this.http.post(`${environment.apiUrl}/edit/user/password/${username}`, {
            currentPassword: currentPassword,
            newPassword: newPassword,
            newPasswordConfirmation: newPasswordConfirmation
        });
    }
}