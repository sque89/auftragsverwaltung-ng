import { Injectable } from '@angular/core';
import {MatSnackBar, MatSnackBarRef} from '@angular/material';

@Injectable({ providedIn: 'root' })
export class NotificationService {
    public constructor(private snackBar: MatSnackBar) {
    }

    public showSuccess(message: string) {
        this.snackBar.open(message, null, {duration: 2000, panelClass: 'bg-success'});
    }

    public showError(message: string) {
        this.snackBar.open(message, 'Verstanden.', {panelClass: 'bg-danger'});
    }
}