import { Component, Output, EventEmitter } from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../../core/services/authentication.service';
import {SessionService} from '../../../core/services/session.service';
import {UiService} from '../../../core/services/ui.service';

@Component({
  selector: 'auftragsverwaltung-ng-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
    public constructor(
        private router: Router,
        private authService: AuthenticationService,
        public sessionService: SessionService,
        public uiService: UiService
    ) {}

    public logout() {
        this.authService.logout();
        this.router.navigate(['/login']);
    }
}