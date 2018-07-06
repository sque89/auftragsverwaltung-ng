import {environment} from '../../../environments/environment';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {User} from '../models/user.model';
import {UiService} from './ui.service';
import {Observable} from 'rxjs';

@Injectable()
export class UserApiService {
    public constructor(private http: HttpClient, private uiService: UiService) {}

    public getUserByUsername(username: string): Observable<User> {
        this.uiService.showLoadingOverlay();
        return this.http.get<User>(`${environment.apiUrl}/user/${username}`)
            .pipe(map((response: any) => {
                this.uiService.hideLoadingOverlay();
                return new User(
                    response.id,
                    response.username,
                    response.firstname,
                    response.lastname,
                    response.email,
                    response.roles,
                    response.isActive
                );
            }));
    }

    public getAllUsers() {
        this.uiService.showLoadingOverlay();
        return this.http.get<Array<User>>(`${environment.apiUrl}/users`)
            .pipe(map((response: any) => {
                this.uiService.hideLoadingOverlay();
                const users: Array<User> = [];
                response.users.forEach((user: any) => {
                    users.push(new User(
                        user.id,
                        user.username,
                        user.firstname,
                        user.lastname,
                        user.email,
                        user.roles,
                        user.isActive
                    ));
                });
                return users;
            }));
    }

    public changeCommonUserData(
        firstname: string,
        lastname: string,
        email: string,
        username?: string
    ) {
        return this.http.post<User>(`${environment.apiUrl}/user/commondata` + (username ? '/' + username : ''), {
            firstname: firstname,
            lastname: lastname,
            email: email
        });
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

    public deleteUser(username: string): Observable<User> {
        return this.http.delete<User>(`${environment.apiUrl}/user/${username}`);
    }

    public activateUser(username: string): Observable<User> {
        return this.http.post<User>(`${environment.apiUrl}/user/activate/${username}`, null);
    }
    public deactivateUser(username: string): Observable<User> {
        return this.http.post<User>(`${environment.apiUrl}/user/deactivate/${username}`, null);
    }

    public changeRoles(username: string, roles: Array<string>): Observable<User> {
        return this.http.post<User>(`${environment.apiUrl}/user/roles/${username}`, roles);
    }
}