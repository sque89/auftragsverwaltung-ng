import { Component, Output, EventEmitter } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'auftragsverwaltung-ng-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
    @Output() toggleMainMenu: EventEmitter<void>;

    public constructor(private router: Router) {
        this.toggleMainMenu = new EventEmitter();
    }

    public emitMainMenuToggle() {
        this.toggleMainMenu.emit();
    }

    public gotoDashboard() {
        this.router.navigate(['/dashboard']);
    }
}