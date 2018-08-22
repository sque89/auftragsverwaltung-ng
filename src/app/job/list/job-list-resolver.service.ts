import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import {Observable} from 'rxjs';
import {Job} from '../../core/models/job.model';
import {JobApiService} from '../../core/services/job-api.service';

@Injectable()
export class JobListResolver implements Resolve<Observable<Job>> {
  public constructor(private jobApiService: JobApiService) {
  }

  public resolve(): Observable<any> {
      return this.jobApiService.getAllJobs();
  }
}