import {environment} from '../../../environments/environment';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, tap} from 'rxjs/operators';
import {User} from '../models/user.model';
import {UiService} from './ui.service';
import {Observable} from 'rxjs';
import * as _ from 'lodash';

@Injectable()
export class UserApiService {
    public constructor(private http: HttpClient, private uiService: UiService) {}

    public getUserByUsername(username: string): Observable<User> {
        this.uiService.showLoadingOverlay();
        return this.http.get<User>(`${environment.apiUrl}/user/${username}`).pipe(
            map((user: any) => {
                this.uiService.hideLoadingOverlay();
                return User.fromObject(user)
            })
        );
    }

    public getAllUsers(): Observable<Array<User>> {
        this.uiService.showLoadingOverlay();
        return this.http.get<Array<User>>(`${environment.apiUrl}/users`).pipe(
            map((response: any) => {
                this.uiService.hideLoadingOverlay();
                const users: Array<User> = [];
                if (!_.isEmpty(response)) {
                    response.forEach((user: any) => {
                        users.push(User.fromObject(user));
                    });
                }
                return users;
            })
        );
    }

    public getAllUsersUnsensitive(): Observable<Array<User>> {
        this.uiService.showLoadingOverlay();
        return this.http.get<Array<User>>(`${environment.apiUrl}/users/unsensitive`).pipe(
            map((response: any) => {
                this.uiService.hideLoadingOverlay();
                const users: Array<User> = [];
                if (!_.isEmpty(response)) {
                    response.forEach((user: any) => {
                        users.push(User.fromObject(user));
                    });
                }
                return users;
            })
        );
    }

    public changeCommonUserData(
        firstname: string,
        lastname: string,
        email: string,
        roles: Array<string>,
        username?: string
    ) {
        return this.http.post<User>(`${environment.apiUrl}/user/commondata` + (username ? '/' + username : ''), {
            firstname: firstname,
            lastname: lastname,
            email: email,
            roles: roles
        });
    }

    public changeSettings(user: User) {
        return this.http.post<User>(`${environment.apiUrl}/user/settings`, JSON.stringify(user.settings));
    }

    public changePassword(
        newPassword: string,
        currentPassword?: string,
        newPasswordConfirmation?: string,
        username?: string
    ) {
        const postData: any = {newPassword: newPassword};

        if (currentPassword) postData.currentPassword = currentPassword;
        if (newPasswordConfirmation) postData.newPasswordConfirmation = newPasswordConfirmation;

        return this.http.post(`${environment.apiUrl}/user/password` + (username ? '/' + username : ''), postData);
    }

    public addUser(
        username: string,
        firstname: string,
        lastname: string,
        email: string,
        roles: Array<string>,
        password: string
    ): Observable<User> {
        return this.http.put<User>(`${environment.apiUrl}/user`, {
            firstname: firstname,
            lastname: lastname,
            email: email,
            roles: roles,
            username: username,
            password: password
        });
    }

    public deleteUser(username: string): Observable<User> {
        return this.http.delete<User>(`${environment.apiUrl}/user/${username}`);
    }

    public activateUser(username: string): Observable<User> {
        return this.http.post<User>(`${environment.apiUrl}/user/activate/${username}`, null);
    }

    public deactivateUser(username: string): Observable<User> {
        return this.http.post<User>(`${environment.apiUrl}/user/deactivate/${username}`, null);
    }
}