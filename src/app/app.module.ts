import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
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
        MatDialogModule
    ],
    entryComponents: [
        CancelDialogComponent,
        DeletionConfirmationDialogComponent
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
