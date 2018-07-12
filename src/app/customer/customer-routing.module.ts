import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from '../core/guards/auth.guard';
import {IsAdminGuard} from '../core/guards/is-admin.guard';
import {CustomerListComponent} from './list/customer-list.component';
import {CustomerProfileComponent} from './profile/customer-profile.component';
import {CustomerListResolver} from './list/customer-list-resolver.service';
import {CustomerProfileResolver} from './profile/customer-profile-resolver.service';

const routes: Routes = [{
    path: 'liste',
    component: CustomerListComponent,
    canActivate: [AuthGuard, IsAdminGuard],
    resolve: {CustomerListResolver}
}, {
    path: ':customerId/details',
    component: CustomerProfileComponent,
    canActivate: [AuthGuard, IsAdminGuard],
    resolve: {CustomerProfileResolver},
    data: {editMode: false}
}, {
    path: ':customerId/bearbeiten',
    component: CustomerProfileComponent,
    canActivate: [AuthGuard, IsAdminGuard],
    resolve: {CustomerProfileResolver},
    data: {editMode: true}
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CustomerRoutingModule {}