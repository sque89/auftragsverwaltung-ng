import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from '../core/guards/auth.guard';
import {IsAdminGuard} from '../core/guards/is-admin.guard';
import {CustomerListComponent} from './list/customer-list.component';
import {CustomerProfileComponent} from './profile/customer-profile.component';
import {CustomerListResolver} from './list/customer-list-resolver.service';
import {CustomerProfileResolver} from './profile/customer-profile-resolver.service';

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
    component: CustomerProfileComponent,
    canActivate: [AuthGuard, IsAdminGuard],
    resolve: {CustomerProfileResolver},
    data: {
        breadcrumb: 'Kundendetails',
        editMode: false
    }
}, {
    path: ':customerId/bearbeiten',
    component: CustomerProfileComponent,
    canActivate: [AuthGuard, IsAdminGuard],
    resolve: {CustomerProfileResolver},
    data: {
        breadcrumb: 'Kunde bearbeiten',
        editMode: true
    }
}, {
    path: 'hinzufuegen',
    component: CustomerProfileComponent,
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