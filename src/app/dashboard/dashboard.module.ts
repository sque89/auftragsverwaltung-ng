import {NgModule} from '@angular/core';

import {ReactiveFormsModule} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
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
    ],
    entryComponents: [
        JobListWidgetComponent,
        QuickstartWidgetComponent,
        SimpleNumberWidgetComponent,
        DoughnutChartWidgetComponent,
        BarChartWidgetComponent
    ]
})
export class DashboardModule {}