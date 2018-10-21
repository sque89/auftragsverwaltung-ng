import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from '../core/guards/auth.guard';
import {UserListComponent} from './list/user-list.component';
import {UserListResolver} from './list/user-list-resolver.service';
import {IsAdminGuard} from '../core/guards/is-admin.guard';
import {UserFormComponent} from './form/user-form.component';
import {UserSingleResolver} from './user-single-resolver.service';
import {UserDetailComponent} from './details/user-detail.component';

const routes: Routes = [
    {
        path: '',
        component: UserListComponent,
        canActivate: [AuthGuard, IsAdminGuard],
        resolve: {UserListResolver},
        data: {
            breadcrumb: 'Liste',
        }
    }, {
        path: 'profil',
        component: UserDetailComponent,
        canActivate: [AuthGuard],
        resolve: {UserSingleResolver},
        data: {
            breadcrumb: 'Eigenes Profil',
            isOwnProfile: true
        }
    }, {
        path: ':username/details',
        component: UserDetailComponent,
        canActivate: [AuthGuard, IsAdminGuard],
        resolve: {UserSingleResolver},
        data: {
            breadcrumb: 'Details'
        }
    }, {
        path: 'profil/bearbeiten',
        component: UserFormComponent,
        canActivate: [AuthGuard],
        resolve: {UserSingleResolver},
        data: {
            breadcrumb: 'Bearbeiten',
            isOwnProfile: true
        }
    }, {
        path: ':username/bearbeiten',
        component: UserFormComponent,
        canActivate: [AuthGuard, IsAdminGuard],
        resolve: {UserSingleResolver},
        data: {
            breadcrumb: 'Bearbeiten'
        }
    }, {
        path: 'hinzufuegen',
        component: UserFormComponent,
        canActivate: [AuthGuard, IsAdminGuard],
        data: {
            breadcrumb: 'Hinzufügen',
            isOwnProfile: false,
            createNew: true
        }
    }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule {}