import {NgModule} from '@angular/core';

import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {ProfileComponent} from './profile/profile.component';
import {UserRoutingModule} from './user-routing.module';
import {CommonModule} from '@angular/common';
import {MatButtonModule, MatTabsModule, MatFormFieldModule, MatInputModule, MatDividerModule, MatListModule, MatCardModule} from '@angular/material';
import {UserApiService} from '../core/services/user-api.service';
import {ProfileResolver} from './profile/profile-resolver.service';
import {UserListComponent} from './list/user-list.component';
import {UserListResolver} from './list/user-list-resolver.service';

@NgModule({
    imports: [
        ReactiveFormsModule,
        CommonModule,
        FormsModule,
        MatButtonModule,
        MatTabsModule,
        MatFormFieldModule,
        MatInputModule,
        MatDividerModule,
        MatListModule,
        MatCardModule,
        UserRoutingModule
    ],
    providers: [
        UserApiService,
        ProfileResolver,
        UserListResolver
    ],
    declarations: [
        ProfileComponent,
        UserListComponent
    ]
})
export class UserModule {}