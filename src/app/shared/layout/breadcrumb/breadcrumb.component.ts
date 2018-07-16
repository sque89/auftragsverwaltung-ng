import {Component, OnDestroy, Input} from '@angular/core';
import {Router, NavigationEnd, ActivatedRoute, NavigationStart} from '@angular/router';
import {Subscription} from 'rxjs';
import {filter, distinctUntilChanged, map} from 'rxjs/operators';
import {Breadcrumb} from '../../../core/models/breadcrumb';
import * as _ from 'lodash';

@Component({
    selector: 'auftragsverwaltung-ng-breadcrumb',
    templateUrl: './breadcrumb.component.html',
    styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnDestroy {
    @Input() buttons: Array<any>;

    private routerEventSubscription: Subscription;
    public breadcrumbs: Array<Breadcrumb>;

    public constructor(private router: Router, private activatedRoute: ActivatedRoute) {
        this.routerEventSubscription = this.router.events.pipe(
            filter(event => event instanceof NavigationEnd),
            distinctUntilChanged())
            .subscribe(event => {
                this.breadcrumbs = this.buildBreadcrumb(this.activatedRoute.root);
            });
    }

    public ngOnDestroy() {
        this.routerEventSubscription.unsubscribe();
    }

    private buildBreadcrumb(route: ActivatedRoute, url: string = '', breadcrumbs: Array<Breadcrumb> = []): Array<Breadcrumb> {
        // If no routeConfig is avalailable we are on the root path
        const label = route.routeConfig && route.routeConfig.data ? route.routeConfig.data['breadcrumb'] : 'Dashboard';
        const path = route.routeConfig ? route.routeConfig.path : '';
        // In the routeConfig the complete path is not available,
        // so we rebuild it each time
        const nextUrl = `${url}${path}/`;
        const breadcrumb = {
            label: label,
            url: this.fillRouteWithParameters(nextUrl, route.snapshot.params),
            params: route.snapshot.params || null
        };
        const newBreadcrumbs = [...breadcrumbs, breadcrumb];
        if (route.firstChild) {
            // If we are not on our current path yet,
            // there will be more children to look after, to build our breadcumb
            return this.buildBreadcrumb(route.firstChild, nextUrl, newBreadcrumbs);
        }
        return newBreadcrumbs;
    }

    private fillRouteWithParameters(route: string, params: any): string {
        let filledRoute = route;
        _.forOwn(params, (value: string, key: string) => {
            filledRoute = filledRoute.replace(':' + key, value);
        });
        return filledRoute;
    }
}