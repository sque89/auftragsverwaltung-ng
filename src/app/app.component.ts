import {Component} from '@angular/core';
import {UiService} from './core/services/ui.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    public mainMenuOpen: boolean;

    public constructor(public uiService: UiService) {
        this.mainMenuOpen = false;
    }

    public toggleMainMenu() {
        this.mainMenuOpen = !this.mainMenuOpen;
    }
}
