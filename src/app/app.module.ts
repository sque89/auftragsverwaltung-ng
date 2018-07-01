import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';

import {MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatGridListModule, MatCardModule, MatMenuModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule, MAT_SNACK_BAR_DEFAULT_OPTIONS} from '@angular/material';

import {AppComponent} from './app.component';
import {HeaderComponent} from './shared/layout/header/header.component';
import {FooterComponent} from './shared/layout/footer/footer.component';
import {SharedModule} from './shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {AuthModule} from './auth/auth.module';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {JwtInterceptor} from './core/interceptors/jwt.interceptor';
import {ErrorInterceptor} from './core/interceptors/error.interceptor';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent
    ],
    imports: [
        AppRoutingModule,
        BrowserAnimationsModule,
        BrowserModule,
        SharedModule,
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
        ReactiveFormsModule,
        AuthModule
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500} }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
