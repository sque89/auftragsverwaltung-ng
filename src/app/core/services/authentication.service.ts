import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {SessionService} from './session.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private jwtHelper: any;

    public constructor(private http: HttpClient, private sessionService: SessionService) {
        this.jwtHelper = new JwtHelperService();
    }

    public login(username: string, password: string) {
        return this.http.post<any>(`${environment.apiUrl}/login_check`, { username: username, password: password })
            .pipe(map((res:any) => {
                if (res && res.token) {
                    const decodedJwt = this.jwtHelper.decodeToken(res.token);
                    this.sessionService.setCurrentUser({
                        id: decodedJwt.id,
                        username: decodedJwt.username,
                        firstname: decodedJwt.firstname,
                        lastname: decodedJwt.lastname,
                        email: decodedJwt.email,
                        roles: decodedJwt.roles,
                        admin: decodedJwt.admin
                    }, res.token);
                }
            }));
    }

    public logout() {
        localStorage.removeItem('currentUser');
    }
}