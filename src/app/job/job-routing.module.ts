import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from '../core/guards/auth.guard';
import {JobListComponent} from './list/job-list.component';
import {JobListResolver} from './list/job-list-resolver.service';
import {JobSingleResolver} from './job-single-resolver.service';
import {JobDetailComponent} from './details/job-detail.component';
import {JobFormComponent} from './form/job-form.component';

const routes: Routes = [
    {
        path: '',
        component: JobListComponent,
        canActivate: [AuthGuard],
        resolve: {JobListResolver},
        data: {
            breadcrumb: 'Liste',
        }
    }, {
        path: ':jobId/details',
        component: JobDetailComponent,
        canActivate: [AuthGuard],
        resolve: {JobSingleResolver},
        data: {
            breadcrumb: 'Jobdetails'
        }
    }, {
        path: 'hinzufuegen',
        component: JobFormComponent,
        canActivate: [AuthGuard],
        data: {
            createNew: true,
            breadcrumb: 'Job bearbeiten'
        }
    }, {
        path: ':jobId/bearbeiten',
        component: JobFormComponent,
        canActivate: [AuthGuard],
        resolve: {JobSingleResolver},
        data: {
            breadcrumb: 'Job bearbeiten'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class JobRoutingModule {}