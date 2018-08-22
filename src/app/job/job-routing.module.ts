import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from '../core/guards/auth.guard';
import {JobListComponent} from './list/job-list.component';
import {JobListResolver} from './list/job-list-resolver.service';

const routes: Routes = [{
    path: '',
    component: JobListComponent,
    canActivate: [AuthGuard],
    resolve: {JobListResolver},
    data: {
        breadcrumb: 'Liste',
    }
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class JobRoutingModule {}