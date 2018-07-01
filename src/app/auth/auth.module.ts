import {NgModule} from '@angular/core';

import {AuthComponent} from './auth.component';
import {AuthRoutingModule} from './auth-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule, MatInputModule, MatButtonModule} from '@angular/material';

@NgModule({
    imports: [
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule,
        AuthRoutingModule
    ],
    declarations: [
        AuthComponent
    ]
})
export class AuthModule {}