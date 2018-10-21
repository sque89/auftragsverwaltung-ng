import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot} from '@angular/router';
import {UserApiService} from '../core/services/user-api.service';
import {Observable} from 'rxjs';
import {User} from '../core/models/user.model';
import {SessionService} from '../core/services/session.service';

@Injectable()
export class UserSingleResolver implements Resolve<Observable<User>> {
    public constructor(private userApiService: UserApiService, private sessionService: SessionService,
    ) {}

    public resolve(route: ActivatedRouteSnapshot): Observable<any> {
        if (route.params.username) {
            return this.userApiService.getUserByUsername(route.params.username);
        } else {
            return this.userApiService.getUserByUsername(this.sessionService.getUser().username);
        }
    }
}