import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {Observable, of} from 'rxjs';
import {Job} from '../../core/models/job.model';
import {JobApiService} from '../../core/services/job-api.service';
import {AppService} from '../../core/services/app.service';
import {JobFilterService} from '../services/job-filter.service';
import * as moment from 'moment';
import * as _ from 'lodash';

@Injectable()
export class JobListResolver implements Resolve<Observable<Job>> {
    public constructor(private jobFilterService: JobFilterService, private jobApiService: JobApiService, private appService: AppService) {
    }

    public resolve(): Observable<any> {
        if (!_.isEmpty(this.jobFilterService.jobsInTimespan)) {
            return of(this.jobFilterService.jobsInTimespan);
        } else {
            const from = moment().subtract(parseInt(this.appService.getSettingById('job_list_default_timespan').value), 'days').startOf('day');
            const to = moment().endOf('day');
            return this.jobApiService.getJobsInTimespan(from, to);
        }
    }
}
