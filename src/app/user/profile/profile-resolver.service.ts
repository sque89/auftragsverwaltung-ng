import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import {UserApiService} from '../../core/services/user-api.service';
import {Observable} from 'rxjs';
import {User} from '../../core/models/user.model';
import {LocalStorageService} from '../../core/services/local-storage.service';

@Injectable()
export class ProfileResolver implements Resolve<Observable<User>> {
  public constructor(private userApiService: UserApiService, private localStorageService: LocalStorageService) {
  }

  public resolve(): Observable<any> {
      return this.userApiService.getUserByUsername(this.localStorageService.getCurrentUsername());
  }
}