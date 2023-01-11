import {NgModule} from '@angular/core';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {CustomerListResolver} from './list/customer-list-resolver.service';
import {CustomerListComponent} from './list/customer-list.component';
import {CustomerRoutingModule} from './customer-routing.module';
import {CustomerApiService} from '../core/services/customer-api.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import {SharedModule} from '../shared/shared.module';
import {CustomerSingleResolver} from './customer-single-resolver.service';
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
        CustomerDetailComponent
    ]
})
export class CustomerModule {}