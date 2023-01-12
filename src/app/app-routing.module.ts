import {NgModule} from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';

const routes: Routes = [
    {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
        data: {
            breadcrumb: 'Dashboard'
        }
    },
    {
        path: 'benutzer',
        loadChildren: () => import('./user/user.module').then(m => m.UserModule),
        data: {
            breadcrumb: 'Benutzer'
        }
    },
    {
        path: 'kunden',
        loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule),
        data: {
            breadcrumb: 'Kunden'
        }
    },
    {
        path: 'jobs',
        loadChildren: () => import('./job/job.module').then(m => m.JobModule),
        data: {
            breadcrumb: 'Jobs'
        }
    },
    {
        path: 'einstellungen',
        loadChildren: () => import('./setting/setting.module').then(m => m.SettingModule),
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
    preloadingStrategy: PreloadAllModules,
    relativeLinkResolution: 'legacy'
})],
    exports: [RouterModule]
})
export class AppRoutingModule {}