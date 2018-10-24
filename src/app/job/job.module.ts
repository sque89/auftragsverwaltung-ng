import {NgModule} from '@angular/core';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {JobListComponent} from './list/job-list.component';
import {JobApiService} from '../core/services/job-api.service';
import {JobListResolver} from './list/job-list-resolver.service';
import {JobRoutingModule} from './job-routing.module';
import {MatTableModule, MatSortModule, MatFormFieldModule, MatInputModule, MatPaginatorModule, MatButtonModule, MatDatepickerModule, MatIconModule, MatSelectModule, MatCardModule, MatChipsModule, MatListModule, MatDividerModule, MatDialogModule} from '@angular/material';
import {SharedModule} from '../shared/shared.module';
import {JobSingleResolver} from './job-single-resolver.service';
import {JobDetailComponent} from './details/job-detail.component';
import {JobFormComponent} from './form/job-form.component';
import {TruncateModule} from '@yellowspot/ng-truncate';

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
        MatDatepickerModule,
        MatIconModule,
        MatSelectModule,
        MatCardModule,
        MatChipsModule,
        MatListModule,
        MatDividerModule,
        MatDialogModule,
        TruncateModule
    ],
    providers: [
        JobApiService,
        JobListResolver,
        JobSingleResolver
    ],
    declarations: [
        JobListComponent,
        JobDetailComponent,
        JobFormComponent
    ]
})
export class JobModule {}