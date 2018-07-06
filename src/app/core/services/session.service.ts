import {environment} from '../../../environments/environment';
import {Injectable} from '@angular/core';
import {User} from '../models/user.model';
import * as _ from 'lodash';

@Injectable({providedIn: 'root'})
export class SessionService {
    public user: User;

    public constructor() {
        this.setUser();
    }

    public getSessionToken(): string {
        return this.isSessionActive() ? JSON.parse(localStorage.getItem(environment.sessionId)).token : null;
    }

    public isSessionActive() {
        const session = JSON.parse(localStorage.getItem(environment.sessionId));
        return session && _.isString(session.token) && !_.isEmpty(session.token);
    }

    public setSession(user: User, token: string) {
        localStorage.setItem(environment.sessionId, JSON.stringify({user: user, token: token}));
        this.setUser();
    }

    public setUser(user?: User) {
        if (user) {
            localStorage.setItem(environment.sessionId, JSON.stringify({user: user, token: this.getSessionToken()}));
        }
        if (this.isSessionActive()) {
            const sessionUser = JSON.parse(localStorage.getItem(environment.sessionId)).user;
            this.user = new User(
                sessionUser.id,
                sessionUser.username,
                sessionUser.firstname,
                sessionUser.lastname,
                sessionUser.email,
                sessionUser.roles,
                sessionUser.isActive
            );
        } else {
            this.user = null;
        }
    }

    public getUser(): User {
        return this.isSessionActive() ? this.user : null;
    }

    public logout() {
        localStorage.removeItem(environment.sessionId);
    }
}