import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {SessionService} from '../services/session.service';

@Injectable({ providedIn: 'root' })
export class IsAdminGuard implements CanActivate {

    constructor(private router: Router, private sessionService: SessionService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.sessionService.getUser().isAdministrator()) {
            return true;
        }

        this.router.navigate(['/dashboard'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}