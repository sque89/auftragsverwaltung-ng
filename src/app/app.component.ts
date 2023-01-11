import {Component, ViewChild, AfterViewInit} from '@angular/core';
import {UiService} from './core/services/ui.service';
import {SessionService} from './core/services/session.service';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
    @ViewChild('mainMenu', { static: true }) mainMenu: MatSidenav;

    public constructor(public uiService: UiService, public sessionService: SessionService) {
    }

    public ngAfterViewInit() {
        this.uiService.setMainMenu(this.mainMenu);
    }
}
