import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {User} from '../core/models/user.model';
import {CustomerApiService} from '../core/services/customer-api.service';

@Injectable()
export class CustomerSingleResolver implements Resolve<Observable<User>> {
    public constructor(private customerApiService: CustomerApiService) {}

    public resolve(route: ActivatedRouteSnapshot): Observable<any> {
        return this.customerApiService.getCustomerById(route.params.customerId);
    }
}