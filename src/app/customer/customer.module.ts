import {NgModule} from '@angular/core';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {CustomerListResolver} from './list/customer-list-resolver.service';
import {CustomerListComponent} from './list/customer-list.component';
import {CustomerRoutingModule} from './customer-routing.module';
import {CustomerApiService} from '../core/services/customer-api.service';
import {MatTableModule, MatSortModule, MatFormFieldModule, MatInputModule, MatPaginatorModule, MatButtonModule} from '@angular/material';
import {CustomerProfileComponent} from './profile/customer-profile.component';
import {CustomerProfileResolver} from './profile/customer-profile-resolver.service';
import {SharedModule} from '../shared/shared.module';

@NgModule({
    imports: [
        ReactiveFormsModule,
        CommonModule,
        FormsModule,
        SharedModule,
        CustomerRoutingModule,
        MatTableModule,
        MatSortModule,
        MatFormFieldModule,
        MatInputModule,
        MatPaginatorModule,
        MatButtonModule
    ],
    providers: [
        CustomerApiService,
        CustomerListResolver,
        CustomerProfileResolver
    ],
    declarations: [
        CustomerListComponent,
        CustomerProfileComponent
    ]
})
export class CustomerModule {}