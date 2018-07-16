import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatToolbarModule, MatIconModule} from '@angular/material';
import {BreadcrumbComponent} from './layout/breadcrumb/breadcrumb.component';
import {RouterModule} from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        MatToolbarModule,
        MatIconModule,
        RouterModule
    ],
    declarations: [
        BreadcrumbComponent
    ],
    exports: [
        BreadcrumbComponent
    ]
})
export class SharedModule {}