import {NgModule} from '@angular/core';

import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule, MatGridListModule, MatIconModule, MatMenuModule, MatCardModule, MatButtonModule, MatProgressSpinnerModule} from '@angular/material';
import {DashboardComponent} from './dashboard.component';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {JobApiService} from '../core/services/job-api.service';

@NgModule({
    imports: [
        MatFormFieldModule,
        MatGridListModule,
        MatIconModule,
        MatMenuModule,
        MatCardModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        ReactiveFormsModule,
        CommonModule,
        DashboardRoutingModule,
        SharedModule
    ],
    providers: [
        JobApiService
    ],
    declarations: [
        DashboardComponent
    ]
})
export class DashboardModule {}