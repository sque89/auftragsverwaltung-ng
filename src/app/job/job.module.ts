import {NgModule} from '@angular/core';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {JobListComponent} from './list/job-list.component';
import {JobApiService} from '../core/services/job-api.service';
import {JobListResolver} from './list/job-list-resolver.service';
import {JobRoutingModule} from './job-routing.module';
import {MatTableModule, MatSortModule, MatFormFieldModule, MatInputModule, MatPaginatorModule, MatButtonModule, MatDatepickerModule} from '@angular/material';
import {SharedModule} from '../shared/shared.module';

@NgModule({
    imports: [
        ReactiveFormsModule,
        CommonModule,
        FormsModule,
        SharedModule,
        JobRoutingModule,
        MatTableModule,
        MatSortModule,
        MatFormFieldModule,
        MatInputModule,
        MatPaginatorModule,
        MatButtonModule,
        MatDatepickerModule
    ],
    providers: [
        JobApiService,
        JobListResolver,
    ],
    declarations: [
        JobListComponent
    ]
})
export class JobModule {}