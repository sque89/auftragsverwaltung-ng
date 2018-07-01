import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ProfileComponent} from './profile/profile.component';
import {AuthGuard} from '../core/guards/auth.guard';
import {ProfileResolver} from './profile/profile-resolver.service';

const routes: Routes = [
    {
        path: 'profil',
        component: ProfileComponent,
        canActivate: [AuthGuard],
        resolve: { ProfileResolver }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule {}