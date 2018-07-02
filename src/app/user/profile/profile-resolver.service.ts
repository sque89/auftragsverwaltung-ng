import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot} from '@angular/router';
import {UserApiService} from '../../core/services/user-api.service';
import {Observable} from 'rxjs';
import {User} from '../../core/models/user.model';
import {LocalStorageService} from '../../core/services/local-storage.service';

@Injectable()
export class ProfileResolver implements Resolve<Observable<User>> {
    public constructor(private userApiService: UserApiService, private localStorageService: LocalStorageService,
    ) {}

    public resolve(route: ActivatedRouteSnapshot): Observable<any> {
        if (route.params.username) {
            return this.userApiService.getUserByUsername(route.params.username);
        } else {
            return this.userApiService.getUserByUsername(this.localStorageService.getCurrentUsername());
        }
    }
}