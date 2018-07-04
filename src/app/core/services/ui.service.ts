import { Injectable } from '@angular/core';
import {MatSidenav} from '@angular/material';

@Injectable({ providedIn: 'root' })
export class UiService {
    public loadingOverlayVisible: boolean;
    public mainMenu: MatSidenav;

    public constructor() {
        this.loadingOverlayVisible = false;
    }

    public setMainMenu(mainMenu: MatSidenav) {
        this.mainMenu = mainMenu;
    }

    public showLoadingOverlay() {
        this.loadingOverlayVisible = true;
    }

    public hideLoadingOverlay() {
        this.loadingOverlayVisible = false;
    }

    public toggleMainMenu() {
        this.mainMenu.toggle();
    }

    public openMainMenu() {
        this.mainMenu.open();
    }

    public closeMainMenu() {
        this.mainMenu.close();
    }
}