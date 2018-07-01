import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
    public getCurrentUsername() {
        return JSON.parse(localStorage.getItem('currentUser')).username;
    }
}