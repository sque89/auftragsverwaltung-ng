import { Component } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {AuthenticationService} from '../core/services/authentication.service';

@Component({
  selector: 'auftragsverwaltung-ng-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
    public form: FormGroup;

    public constructor(private authService: AuthenticationService) {
    }

    public ngOnInit() {
        this.form = new FormGroup({
            username: new FormControl('', [
                Validators.required
            ]),
            password: new FormControl('', [
                Validators.required
            ])
        });
    }

    public login(credentials: {username: string, password: string}, isValid: boolean) {
        if (isValid) {
            this.authService.login(credentials.username, credentials.password);
        }
    }
}