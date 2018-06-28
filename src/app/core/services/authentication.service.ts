import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    public constructor(private http: HttpClient) { }

    public login(username: string, password: string) {
        return this.http.post<any>(`${environment.apiUrl}/login_check`, { username: username, password: password })
            .pipe(map((res:any) => {
                if (res && res.token) {
                    localStorage.setItem('currentUser', JSON.stringify({ username, token: res.token }));
                }
            }));
    }

    public logout() {
        localStorage.removeItem('currentUser');
    }
}