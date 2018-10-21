import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Job} from '../core/models/job.model';
import {JobApiService} from '../core/services/job-api.service';

@Injectable()
export class JobSingleResolver implements Resolve<Observable<Job>> {
    public constructor(private jobApiService: JobApiService) {}

    public resolve(route: ActivatedRouteSnapshot): Observable<any> {
        return this.jobApiService.getJobById(route.params.jobId);
    }
}