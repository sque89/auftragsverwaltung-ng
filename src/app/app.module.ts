import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule, LOCALE_ID, APP_INITIALIZER} from '@angular/core';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatGridListModule, MatCardModule, MatMenuModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule, MatSnackBarModule, MatDialogModule} from '@angular/material';
import {AppComponent} from './app.component';
import {HeaderComponent} from './shared/layout/header/header.component';
import {FooterComponent} from './shared/layout/footer/footer.component';
import {SharedModule} from './shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {AuthModule} from './auth/auth.module';
import {CancelDialogComponent} from './shared/dialogs/cancel/cancel-dialog.component';
import {DeletionConfirmationDialogComponent} from './shared/dialogs/deletionConfirmation/deletion-confirmation-dialog.component';
import {CoreModule} from './core/core.module';
import {HttpClientModule} from '@angular/common/http';
import {AppService} from './core/services/app.service';
import {SettingApiService} from './core/services/setting-api.service';

export function getSettings(appService: AppService) {
    return () => {
        return appService.initialize();
    };
}

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
        {provide: LOCALE_ID, useValue: 'de'},
        {provide: APP_INITIALIZER, useFactory: getSettings, deps: [AppService], multi: true}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
