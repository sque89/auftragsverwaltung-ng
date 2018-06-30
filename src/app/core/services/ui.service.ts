import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UiService {
    public loadingOverlayVisible: boolean;

    public constructor() {
        this.loadingOverlayVisible = false;
    }

    public showLoadingOverlay() {
        this.loadingOverlayVisible = true;
    }

    public hideLoadingOverlay() {
        this.loadingOverlayVisible = false;
    }
}