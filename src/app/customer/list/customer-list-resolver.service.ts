import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import {Observable} from 'rxjs';
import {User} from '../../core/models/user.model';
import {CustomerApiService} from '../../core/services/customer-api.service';

@Injectable()
export class CustomerListResolver implements Resolve<Observable<User>> {
  public constructor(private customerApiService: CustomerApiService) {
  }

  public resolve(): Observable<any> {
      return this.customerApiService.getAllCustomers();
  }
}