import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ProfileComponent} from './profile/profile.component';
import {AuthGuard} from '../core/guards/auth.guard';
import {ProfileResolver} from './profile/profile-resolver.service';
import {UserListComponent} from './list/user-list.component';
import {UserListResolver} from './list/user-list-resolver.service';
import {IsAdminGuard} from '../core/guards/is-admin.guard';

const routes: Routes = [{
    path: 'profil',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    resolve: {ProfileResolver},
    data: {
        breadcrumb: 'Eigenes Profil',
        isOwnProfile: true,
        editMode: true
    }
}, {
    path: '',
    component: UserListComponent,
    canActivate: [AuthGuard, IsAdminGuard],
    resolve: {UserListResolver},
    data: {
        breadcrumb: 'Liste',
    }
}, {
    path: ':username/details',
    component: ProfileComponent,
    canActivate: [AuthGuard, IsAdminGuard],
    resolve: {ProfileResolver},
    data: {
        breadcrumb: 'Benutzerdetails',
        isOwnProfile: false,
        editMode: false
    }
}, {
    path: ':username/bearbeiten',
    component: ProfileComponent,
    canActivate: [AuthGuard, IsAdminGuard],
    resolve: {ProfileResolver},
    data: {
        breadcrumb: 'Benutzer bearbeiten',
        isOwnProfile: false,
        editMode: true
    }
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule {}