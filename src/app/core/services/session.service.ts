import {Injectable} from '@angular/core';
import {User} from '../models/user.model';

@Injectable({providedIn: 'root'})
export class SessionService {
    private readonly USER_ROLES = {
        ADMIN: 'ROLE_ADMIN',
        USER: 'ROLE_USER'
    };

    public constructor() {
    }

    private getCurrentUserFromLocalStorage() {
        return JSON.parse(localStorage.getItem('currentUser'));
    }

    public setCurrentUser(user: User, token: string) {
        localStorage.setItem('currentUser', JSON.stringify({user: user, token: token}));
    }

    public isLoggedIn() {
        return this.getCurrentUserFromLocalStorage()
            && this.getCurrentUserFromLocalStorage().user
            && this.getCurrentUserFromLocalStorage().token;
    }

    public getUsername(): string {
        return this.getCurrentUserFromLocalStorage()
            && this.getCurrentUserFromLocalStorage().user.username;
    }

    public isAdmin(): string {
        return this.getCurrentUserFromLocalStorage()
            && this.getCurrentUserFromLocalStorage().user.roles.find((element) => {
                return element === this.USER_ROLES.ADMIN;
            });
    }
}