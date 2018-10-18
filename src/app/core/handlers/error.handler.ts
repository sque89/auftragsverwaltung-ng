import {ErrorHandler, Injectable, Injector, NgZone} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {NotificationService} from '../services/notification.service';
import {UiService} from '../services/ui.service';
import {LogApiService} from '../services/log-api.service';

@Injectable()
export class ErrorsHandler implements ErrorHandler {
    private notificationService: NotificationService;
    private uiService: UiService;
    private logApiService: LogApiService;

    public constructor(injector: Injector, private zone: NgZone) {
        this.notificationService = injector.get(NotificationService);
        this.uiService = injector.get(UiService);
        this.logApiService = injector.get(LogApiService);
    }

    public handleError(error: any) {
        this.uiService.hideLoadingOverlay();
        console.error('ErrorHandler' + error);

        if (!navigator.onLine) {
            this.zone.run(() => {
                this.notificationService.showError('Es besteht keine Verbindung zum Netzwerk.');
            });
        } else if (error instanceof HttpErrorResponse) {
            this.zone.run(() => {
                this.notificationService.showError('Es ist ein Server-Fehler aufgetreten.');
            });
        } else {
            this.logApiService.logError(error.message, error.stack);
            this.zone.run(() => {
                this.notificationService.showError('Es ist ein Fehler in der Anwendung aufgetreten.');
            });
        }
    }
}