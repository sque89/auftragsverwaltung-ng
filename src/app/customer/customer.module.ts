import {NgModule} from '@angular/core';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {CustomerListResolver} from './list/customer-list-resolver.service';
import {CustomerListComponent} from './list/customer-list.component';
import {CustomerRoutingModule} from './customer-routing.module';
import {CustomerApiService} from '../core/services/customer-api.service';
import {MatTableModule, MatSortModule, MatFormFieldModule, MatInputModule, MatPaginatorModule, MatButtonModule, MatCardModule} from '@angular/material';
import {SharedModule} from '../shared/shared.module';
import {CustomerSingleResolver} from './customer-single-resolver.service';
import {CustomerFormComponent} from './form/customer-form.component';
import {CustomerDetailComponent} from './details/customer-detail.component';

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
        MatButtonModule,
        MatCardModule
    ],
    providers: [
        CustomerApiService,
        CustomerListResolver,
        CustomerSingleResolver
    ],
    declarations: [
        CustomerListComponent,
        CustomerFormComponent,
        CustomerDetailComponent
    ]
})
export class CustomerModule {}