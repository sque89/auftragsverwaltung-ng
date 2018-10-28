import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule, LOCALE_ID, APP_INITIALIZER, ErrorHandler} from '@angular/core';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatGridListModule, MatCardModule, MatMenuModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule, MatSnackBarModule, MatDialogModule, MAT_DATE_FORMATS} from '@angular/material';
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
    entryComponents: [
        CancelDialogComponent,
        DeletionConfirmationDialogComponent
    ],
    providers: [
        SettingApiService,
        DeliveryTypeApiService,
        LogApiService,
        {provide: LOCALE_ID, useValue: 'de'},
        {provide: APP_INITIALIZER, useFactory: getSettings, deps: [AppService], multi: true},
        //{provide: ErrorHandler, useClass: ErrorsHandler},
        {provide: MAT_DATE_FORMATS, useValue: DATE_FORMATS}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
