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

    public setCurrentUser(user: User, token?: string) {
        const currentUser = this.getCurrentUserFromLocalStorage();
        if (token) {
            localStorage.setItem('currentUser', JSON.stringify({user: user, token: token}));
        } else {
            localStorage.setItem('currentUser', JSON.stringify({user: user, token: currentUser.token}));
        }
    }

    public isLoggedIn() {
        const currentUser = this.getCurrentUserFromLocalStorage();
        return currentUser
            && currentUser.user
            && currentUser.token;
    }

    public getUsername(): string {
        return this.getCurrentUserFromLocalStorage()
            && this.getCurrentUserFromLocalStorage().user.username;
    }

    public getFullName(): string {
        return this.getCurrentUserFromLocalStorage()
            && `${this.getCurrentUserFromLocalStorage().user.firstname} ${this.getCurrentUserFromLocalStorage().user.lastname}`;
    }

    public isAdmin(): string {
        return this.getCurrentUserFromLocalStorage()
            && this.getCurrentUserFromLocalStorage().user.roles.find((element: string) => {
                return element === this.USER_ROLES.ADMIN;
            });
    }
}