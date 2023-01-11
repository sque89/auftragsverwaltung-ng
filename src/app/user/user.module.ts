import {NgModule} from '@angular/core';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {UserRoutingModule} from './user-routing.module';
import {CommonModule} from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import {UserApiService} from '../core/services/user-api.service';
import {UserListComponent} from './list/user-list.component';
import {UserListResolver} from './list/user-list-resolver.service';
import {SharedModule} from '../shared/shared.module';
import {UserSingleResolver} from './user-single-resolver.service';
import {UserDetailComponent} from './details/user-detail.component';
import {UserFormComponent} from './form/user-form.component';

@NgModule({
    imports: [
        ReactiveFormsModule,
        CommonModule,
        FormsModule,
        SharedModule,
        MatButtonModule,
        MatTabsModule,
        MatFormFieldModule,
        MatInputModule,
        MatDividerModule,
        MatListModule,
        MatCardModule,
        MatSlideToggleModule,
        MatSelectModule,
        UserRoutingModule,
        MatChipsModule
    ],
    providers: [
        UserApiService,
        UserSingleResolver,
        UserListResolver
    ],
    declarations: [
        UserDetailComponent,
        UserListComponent,
        UserFormComponent
    ]
})
export class UserModule {}