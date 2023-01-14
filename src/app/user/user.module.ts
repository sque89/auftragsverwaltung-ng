import {NgModule} from '@angular/core';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {UserRoutingModule} from './user-routing.module';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyChipsModule as MatChipsModule } from '@angular/material/legacy-chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatLegacySlideToggleModule as MatSlideToggleModule } from '@angular/material/legacy-slide-toggle';
import { MatLegacyTabsModule as MatTabsModule } from '@angular/material/legacy-tabs';
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