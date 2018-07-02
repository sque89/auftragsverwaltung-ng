import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ProfileComponent} from './profile/profile.component';
import {AuthGuard} from '../core/guards/auth.guard';
import {ProfileResolver} from './profile/profile-resolver.service';
import {UserListComponent} from './list/user-list.component';
import {UserListResolver} from './list/user-list-resolver.service';

const routes: Routes = [{
    path: 'profil',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    resolve: {ProfileResolver},
    data: {isAdmin: false}
}, {
    path: 'liste',
    component: UserListComponent,
    canActivate: [AuthGuard],
    resolve: {UserListResolver}
}, {
    path: ':username/details',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    resolve: {ProfileResolver},
    data: {isAdmin: true}
}, {
    path: ':username/bearbeiten',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    resolve: {ProfileResolver},
    data: {isAdmin: true}
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule {}