import {NgModule} from '@angular/core';

import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import {DashboardComponent} from './dashboard.component';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {CommonModule} from '@angular/common';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {SharedModule} from '../shared/shared.module';
import {JobApiService} from '../core/services/job-api.service';
import {JobListWidgetComponent} from '../shared/widgets/job-list/job-list-widget.component';
import {QuickstartWidgetComponent} from '../shared/widgets/quickstart/quickstart-widget.component';
import {SimpleNumberWidgetComponent} from '../shared/widgets/simple-number/simple-number-widget.component';
import {DoughnutChartWidgetComponent} from '../shared/widgets/doughnut-chart/doughnut-chart-widget.component';
import {BarChartWidgetComponent} from '../shared/widgets/bar-chart/bar-chart-widget.component';
import {UserApiService} from '../core/services/user-api.service';

@NgModule({
    imports: [
        MatFormFieldModule,
        MatGridListModule,
        MatIconModule,
        MatMenuModule,
        MatCardModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        MatListModule,
        ReactiveFormsModule,
        CommonModule,
        DashboardRoutingModule,
        DragDropModule,
        SharedModule
    ],
    providers: [
        JobApiService,
        UserApiService
    ],
    declarations: [
        DashboardComponent
    ]
})
export class DashboardModule {}