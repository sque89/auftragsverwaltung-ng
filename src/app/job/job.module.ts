import {NgModule} from '@angular/core';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {JobListComponent} from './list/job-list.component';
import {JobApiService} from '../core/services/job-api.service';
import {JobListResolver} from './list/job-list-resolver.service';
import {JobRoutingModule} from './job-routing.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import {SharedModule} from '../shared/shared.module';
import {JobSingleResolver} from './job-single-resolver.service';
import {JobDetailComponent} from './details/job-detail.component';
import {JobFormComponent} from './form/job-form.component';
import {TruncateModule} from '@yellowspot/ng-truncate';
import {CustomerApiService} from '../core/services/customer-api.service';
import {UserApiService} from '../core/services/user-api.service';
import {HighlightPipe} from '../core/pipes/highlight/highlight.pipe';
import {TaskFormDialogComponent} from './dialogs/task/task-form-dialog.component';
import {TaskApiService} from '../core/services/task-api.service';
import {JobService} from './services/job.service';
import {JobFilterService} from './services/job-filter.service';
import {InvoiceDialogComponent} from './dialogs/invoice/invoice-dialog.component';
import {Nl2BrPipeModule} from 'nl2br-pipe';

@NgModule({
    imports: [
        ReactiveFormsModule,
        CommonModule,
        FormsModule,
        SharedModule,
        JobRoutingModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatDatepickerModule,
        MatIconModule,
        MatSelectModule,
        MatCardModule,
        MatChipsModule,
        MatListModule,
        MatDividerModule,
        MatDialogModule,
        MatAutocompleteModule,
        MatExpansionModule,
        MatTableModule,
        MatSlideToggleModule,
        MatMenuModule,
        MatTooltipModule,
        MatPaginatorModule,
        TruncateModule,
        Nl2BrPipeModule
    ],
    providers: [
        JobApiService,
        JobListResolver,
        JobSingleResolver,
        CustomerApiService,
        UserApiService,
        TaskApiService,
        JobService,
        JobFilterService
    ],
    declarations: [
        JobListComponent,
        JobDetailComponent,
        JobFormComponent,
        HighlightPipe,
        TaskFormDialogComponent,
        InvoiceDialogComponent
    ],
    entryComponents: [
        TaskFormDialogComponent,
        InvoiceDialogComponent
    ]
})
export class JobModule {}
