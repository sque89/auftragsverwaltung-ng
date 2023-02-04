import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule, LOCALE_ID, APP_INITIALIZER, ErrorHandler} from '@angular/core';
import {MatMomentDateModule, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {MatButtonModule} from '@angular/material/button';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import {AppComponent} from './app.component';
import {HeaderComponent} from './shared/layout/header/header.component';
import {FooterComponent} from './shared/layout/footer/footer.component';
import {SharedModule} from './shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {AuthModule} from './auth/auth.module';
import {CancelDialogComponent} from './shared/dialogs/cancel/cancel-dialog.component';
import {DeletionConfirmationDialogComponent} from './shared/dialogs/deletion-confirmation/deletion-confirmation-dialog.component';
import {CoreModule} from './core/core.module';
import {HttpClientModule} from '@angular/common/http';
import {AppService} from './core/services/app.service';
import {SettingApiService} from './core/services/setting-api.service';
import {ErrorsHandler} from './core/handlers/error.handler';
import {LogApiService} from './core/services/log-api.service';
import {DeliveryTypeApiService} from './core/services/delivery-type-api.service';
import {registerLocaleData} from '@angular/common';
import localeDe from '@angular/common/locales/de';

registerLocaleData(localeDe);

export function getSettings(appService: AppService) {
    return () => {
        return appService.initialize();
    };
}

export const DATE_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        CancelDialogComponent,
        DeletionConfirmationDialogComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CoreModule,
        HttpClientModule,
        SharedModule,
        AppRoutingModule,
        ReactiveFormsModule,
        AuthModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatGridListModule,
        MatCardModule,
        MatMenuModule,
        MatFormFieldModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatSnackBarModule,
        MatDialogModule,
        MatMomentDateModule
    ],
    providers: [
        SettingApiService,
        DeliveryTypeApiService,
        LogApiService,
        {provide: LOCALE_ID, useValue: 'de-DE'},
        {provide: APP_INITIALIZER, useFactory: getSettings, deps: [AppService], multi: true},
        //{provide: ErrorHandler, useClass: ErrorsHandler},
        {provide: MAT_DATE_FORMATS, useValue: DATE_FORMATS},
        {provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true }}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
