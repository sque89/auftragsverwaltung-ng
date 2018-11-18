import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatToolbarModule, MatIconModule, MatButtonModule, MatGridListModule} from '@angular/material';
import {BreadcrumbComponent} from './layout/breadcrumb/breadcrumb.component';
import {RouterModule} from '@angular/router';
import {ChartModule} from 'primeng/primeng';
import {ActionHeadlineComponent} from './content/action-headline/action-headline.component';
import {JobListWidgetComponent} from './widgets/job-list/job-list-widget.component';
import {QuickstartWidgetComponent} from './widgets/quickstart/quickstart-widget.component';
import {SimpleNumberWidgetComponent} from './widgets/simple-number/simple-number-widget.component';
import {DoughnutChartWidgetComponent} from './widgets/doughnut-chart/doughnut-chart-widget.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatGridListModule,
        ChartModule
    ],
    declarations: [
        BreadcrumbComponent,
        ActionHeadlineComponent,
        JobListWidgetComponent,
        QuickstartWidgetComponent,
        SimpleNumberWidgetComponent,
        DoughnutChartWidgetComponent
    ],
    exports: [
        BreadcrumbComponent,
        ActionHeadlineComponent,
        JobListWidgetComponent,
        QuickstartWidgetComponent,
        SimpleNumberWidgetComponent,
        DoughnutChartWidgetComponent
    ]
})
export class SharedModule {}