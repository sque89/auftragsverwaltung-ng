import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import {UserApiService} from '../../core/services/user-api.service';
import {Observable} from 'rxjs';
import {User} from '../../core/models/user.model';

@Injectable()
export class UserListResolver implements Resolve<Observable<User>> {
  public constructor(private userApiService: UserApiService) {
  }

  public resolve(): Observable<any> {
      return this.userApiService.getAllUsers();
  }
}