import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from '../core/guards/auth.guard';
import {IsAdminGuard} from '../core/guards/is-admin.guard';
import {CustomerListComponent} from './list/customer-list.component';
import {CustomerListResolver} from './list/customer-list-resolver.service';
import {CustomerDetailComponent} from './details/customer-detail.component';
import {CustomerSingleResolver} from './customer-single-resolver.service';
import {CustomerFormComponent} from './form/customer-form.component';

const routes: Routes = [{
    path: '',
    component: CustomerListComponent,
    canActivate: [AuthGuard, IsAdminGuard],
    resolve: {CustomerListResolver},
    data: {
        breadcrumb: 'Liste'
    }
}, {
    path: ':customerId/details',
    component: CustomerDetailComponent,
    canActivate: [AuthGuard, IsAdminGuard],
    resolve: {CustomerSingleResolver},
    data: {
        breadcrumb: 'Kundendetails',
        editMode: false
    }
}, {
    path: ':customerId/bearbeiten',
    component: CustomerFormComponent,
    canActivate: [AuthGuard, IsAdminGuard],
    resolve: {CustomerSingleResolver},
    data: {
        breadcrumb: 'Kunde bearbeiten',
        editMode: true
    }
}, {
    path: 'hinzufuegen',
    component: CustomerFormComponent,
    canActivate: [AuthGuard, IsAdminGuard],
    data: {
        breadcrumb: 'Kunde hinzufügen',
        editMode: true,
        createNew: true
    }
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CustomerRoutingModule {}