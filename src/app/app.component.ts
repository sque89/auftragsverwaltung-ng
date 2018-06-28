import {Component} from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    public mainMenuOpen: boolean;

    public constructor() {
        this.mainMenuOpen = false;
    }

    public toggleMainMenu() {
        this.mainMenuOpen = !this.mainMenuOpen;
    }
}
