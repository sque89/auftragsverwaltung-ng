import {Component} from '@angular/core';
import {UiService} from './core/services/ui.service';
import {SessionService} from './core/services/session.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    public mainMenuOpen: boolean;

    public constructor(public uiService: UiService, public sessionService: SessionService) {
        this.mainMenuOpen = false;
    }

    public toggleMainMenu() {
        this.mainMenuOpen = !this.mainMenuOpen;
    }
}
