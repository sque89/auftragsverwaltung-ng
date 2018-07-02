import { Component, Output, EventEmitter } from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../../core/services/authentication.service';

@Component({
  selector: 'auftragsverwaltung-ng-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
    @Output() toggleMainMenu: EventEmitter<void>;

    public constructor(private router: Router, private authService: AuthenticationService) {
        this.toggleMainMenu = new EventEmitter();
    }

    public emitMainMenuToggle() {
        this.toggleMainMenu.emit();
    }

    public logout() {
        this.authService.logout();
        this.router.navigate(['/login']);
    }
}