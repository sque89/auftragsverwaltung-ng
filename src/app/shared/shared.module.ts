import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatToolbarModule, MatIconModule, MatButtonModule, MatGridListModule} from '@angular/material';
import {BreadcrumbComponent} from './layout/breadcrumb/breadcrumb.component';
import {RouterModule} from '@angular/router';
import {ActionHeadlineComponent} from './content/action-headline/action-headline.component';
import {JobListWidgetComponent} from './widgets/job-list/job-list-widget.component';
import {QuickstartWidgetComponent} from './widgets/quickstart/quickstart-widget.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatGridListModule
    ],
    declarations: [
        BreadcrumbComponent,
        ActionHeadlineComponent,
        JobListWidgetComponent,
        QuickstartWidgetComponent
    ],
    exports: [
        BreadcrumbComponent,
        ActionHeadlineComponent,
        JobListWidgetComponent,
        QuickstartWidgetComponent
    ]
})
export class SharedModule {}