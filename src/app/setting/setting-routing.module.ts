import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from '../core/guards/auth.guard';
import {SettingComponent} from './setting.component';
import {IsAdminGuard} from '../core/guards/is-admin.guard';

const routes: Routes = [
    {
        path: '',
        component: SettingComponent,
        canActivate: [AuthGuard, IsAdminGuard],
        data: {
            breadcrumb: 'Bearbeiten'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SettingRoutingModule {}