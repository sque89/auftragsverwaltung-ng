import {NgModule} from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';

const routes: Routes = [
    {
        path: 'dashboard',
        loadChildren: './dashboard/dashboard.module#DashboardModule',
        data: {
            breadcrumb: 'Dashboard'
        }
    },
    {
        path: 'benutzer',
        loadChildren: './user/user.module#UserModule',
        data: {
            breadcrumb: 'Benutzer'
        }
    },
    {
        path: 'kunden',
        loadChildren: './customer/customer.module#CustomerModule',
        data: {
            breadcrumb: 'Kunden'
        }
    },
    {
        path: 'jobs',
        loadChildren: './job/job.module#JobModule',
        data: {
            breadcrumb: 'Jobs'
        }
    },
    {
        path: 'einstellungen',
        loadChildren: './setting/setting.module#SettingModule',
        data: {
            breadcrumb: 'Einstellungen'
        }
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
        // preload all modules; optionally we could
        // implement a custom preloading strategy for just some
        // of the modules (PRs welcome 😉)
        preloadingStrategy: PreloadAllModules
    })],
    exports: [RouterModule]
})
export class AppRoutingModule {}