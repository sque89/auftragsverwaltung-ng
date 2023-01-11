import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import {BreadcrumbComponent} from './layout/breadcrumb/breadcrumb.component';
import {RouterModule} from '@angular/router';
import {ChartModule} from 'primeng/primeng';
import {ActionHeadlineComponent} from './content/action-headline/action-headline.component';
import {JobListWidgetComponent} from './widgets/job-list/job-list-widget.component';
import {QuickstartWidgetComponent} from './widgets/quickstart/quickstart-widget.component';
import {SimpleNumberWidgetComponent} from './widgets/simple-number/simple-number-widget.component';
import {DoughnutChartWidgetComponent} from './widgets/doughnut-chart/doughnut-chart-widget.component';
import {BarChartWidgetComponent} from './widgets/bar-chart/bar-chart-widget.component';

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
        DoughnutChartWidgetComponent,
        BarChartWidgetComponent
    ],
    exports: [
        BreadcrumbComponent,
        ActionHeadlineComponent,
        JobListWidgetComponent,
        QuickstartWidgetComponent,
        SimpleNumberWidgetComponent,
        DoughnutChartWidgetComponent,
        BarChartWidgetComponent
    ]
})
export class SharedModule {}