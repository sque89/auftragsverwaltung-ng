import {NgModule} from '@angular/core';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {CustomerListResolver} from './list/customer-list-resolver.service';
import {CustomerListComponent} from './list/customer-list.component';
import {CustomerRoutingModule} from './customer-routing.module';
import {CustomerApiService} from '../core/services/customer-api.service';
import {MatButtonModule} from '@angular/material/button';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyPaginatorModule as MatPaginatorModule } from '@angular/material/legacy-paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
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