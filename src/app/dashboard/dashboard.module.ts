import {NgModule} from '@angular/core';

import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule, MatGridListModule, MatIconModule, MatMenuModule, MatCardModule, MatButtonModule} from '@angular/material';
import {DashboardComponent} from './dashboard.component';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {CommonModule} from '@angular/common';

@NgModule({
    imports: [
        MatFormFieldModule,
        MatGridListModule,
        MatIconModule,
        MatMenuModule,
        MatCardModule,
        MatButtonModule,
        ReactiveFormsModule,
        CommonModule,
        DashboardRoutingModule
    ],
    declarations: [
        DashboardComponent
    ]
})
export class DashboardModule {}