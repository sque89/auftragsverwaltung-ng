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
        return this.http.get<Array<Job>>(`${environment.apiUrl}/jobs`).pipe(
            map((response: any) => {
                this.uiService.hideLoadingOverlay();
                const jobs: Array<Job> = [];
                if (!_.isEmpty(response)) {
                    response.forEach((job: any) => {
                        jobs.push(Job.fromObject(job));
                    });
                }
                return jobs;
            })
        );
    }

    public getJobsInTimespan(from: Moment, to: Moment) {
        this.uiService.showLoadingOverlay();
        return this.http.get<Array<Job>>(`${environment.apiUrl}/jobs/${from.unix()}/${to.unix()}`).pipe(
            map((response: any) => {
                this.uiService.hideLoadingOverlay();
                const jobs: Array<Job> = [];
                if (!_.isEmpty(response)) {
                    response.forEach((job: any) => {
                        jobs.push(Job.fromObject(job));
                    });
                }
                return jobs;
            }));
    }

    public getJobById(id: string) {
        this.uiService.showLoadingOverlay();
        return this.http.get<Array<Job>>(`${environment.apiUrl}/job/${id}`).pipe(
            map((job: any) => {
                this.uiService.hideLoadingOverlay();
                return Job.fromObject(job)
            })
        );
    }

    public createJob(job: Job) {
        this.uiService.showLoadingOverlay();
        return this.http.post<Job>(`${environment.apiUrl}/job`, job).pipe(
            map((job: any) => {
                this.uiService.hideLoadingOverlay();
                return Job.fromObject(job);
            })
         );
    }

    public changeJobById(job: Job) {
        this.uiService.showLoadingOverlay();
        return this.http.post<Job>(`${environment.apiUrl}/job/${job.id}`, job).pipe(
            map((job: any) => {
                this.uiService.hideLoadingOverlay();
                return Job.fromObject(job);
            })
        );
    }
}