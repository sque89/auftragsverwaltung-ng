import * as _ from 'lodash';
import {environment} from '../../../environments/environment';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {UiService} from './ui.service';
import {Job} from '../models/job.model';
import {Moment} from 'moment';

@Injectable()
export class JobApiService {
    public constructor(private http: HttpClient, private uiService: UiService) {}

    public getAllJobs() {
        this.uiService.showLoadingOverlay();
        return this.http.get<Array<Job>>(`${environment.apiUrl}/jobs`)
            .pipe(map((response: any) => {
                this.uiService.hideLoadingOverlay();
                const jobs: Array<Job> = [];
                if (!_.isEmpty(response)) {
                    response.forEach((job: any) => {
                        jobs.push(new Job(
                            job.id,
                            job.dateIncoming,
                            job.dateDeadline,
                            job.deliveryType,
                            job.description,
                            job.notes,
                            job.externalPurchase,
                            job.invoiceNumber,
                            job.arrangers,
                            job.createdAt,
                            job.updatedAt
                        ));
                    });
                }
                return jobs;
            }));
    }

    public getJobsInTimespan(from: Moment, to: Moment) {
        this.uiService.showLoadingOverlay();
        return this.http.get<Array<Job>>(`${environment.apiUrl}/jobs/${from.unix()}/${to.unix()}`)
            .pipe(map((response: any) => {
                this.uiService.hideLoadingOverlay();
                const jobs: Array<Job> = [];
                if (!_.isEmpty(response)) {
                    response.forEach((job: any) => {
                        jobs.push(new Job(
                            job.id,
                            job.dateIncoming,
                            job.dateDeadline,
                            job.deliveryType,
                            job.description,
                            job.notes,
                            job.externalPurchase,
                            job.invoiceNumber,
                            job.arrangers,
                            job.createdAt,
                            job.updatedAt
                        ));
                    });
                }
                return jobs;
            }));
    }
}