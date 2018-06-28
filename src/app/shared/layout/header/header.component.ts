import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'auftragsverwaltung-ng-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
    @Output() toggleMainMenu: EventEmitter<void>;

    public constructor() {
        this.toggleMainMenu = new EventEmitter();
    }

    public emitMainMenuToggle() {
        this.toggleMainMenu.emit();
    }
}