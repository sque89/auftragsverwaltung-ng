import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatToolbarModule, MatIconModule, MatButtonModule} from '@angular/material';
import {BreadcrumbComponent} from './layout/breadcrumb/breadcrumb.component';
import {RouterModule} from '@angular/router';
import {ActionHeadlineComponent} from './content/action-headline/action-headline.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule
    ],
    declarations: [
        BreadcrumbComponent,
        ActionHeadlineComponent
    ],
    exports: [
        BreadcrumbComponent,
        ActionHeadlineComponent
    ]
})
export class SharedModule {}