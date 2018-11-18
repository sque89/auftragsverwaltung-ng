import * as _ from 'lodash';
import {environment} from '../../../environments/environment';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, tap} from 'rxjs/operators';
import {UiService} from './ui.service';
import {Job} from '../models/job.model';
import {Moment} from 'moment';
import {Observable} from 'rxjs';

@Injectable()
export class JobApiService {
    private readonly ENDPOINTS = {
        JOB: `${environment.apiUrl}/job`,
        JOBS: `${environment.apiUrl}/jobs`
    };

    public constructor(private http: HttpClient, private uiService: UiService) {}

    public getAllJobs(): Observable<Array<Job>> {
        this.uiService.showLoadingOverlay();
        return this.http.get<Array<Job>>(this.ENDPOINTS.JOBS).pipe(
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

    public getJobsInTimespan(from: Moment, to: Moment): Observable<Array<Job>> {
        this.uiService.showLoadingOverlay();
        return this.http.get<Array<Job>>(this.ENDPOINTS.JOBS + `/timespan/${from.unix()}/${to.unix()}`).pipe(
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

    public getJobById(id: string): Observable<Job> {
        this.uiService.showLoadingOverlay();
        return this.http.get<Array<Job>>(this.ENDPOINTS.JOB + `/${id}`).pipe(
            map((job: any) => {
                this.uiService.hideLoadingOverlay();
                return Job.fromObject(job)
            })
        );
    }

    public getOpenJobsForLoggedInUser(skipSpinner = false): Observable<Array<Job>> {
        if (!skipSpinner) {
            this.uiService.showLoadingOverlay();
        }
        return this.http.get<Array<Job>>(this.ENDPOINTS.JOBS + `/open/current-user`).pipe(
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

    public getOpenJobCount(skipSpinner = false): Observable<number> {
        if (!skipSpinner) {
            this.uiService.showLoadingOverlay();
        }
        return this.http.get<number>(this.ENDPOINTS.JOBS + `/open/count`).pipe(
            tap(() => this.uiService.hideLoadingOverlay())
        );
    }

    public getOpenIntimeJobCount(skipSpinner = false): Observable<number> {
        if (!skipSpinner) {
            this.uiService.showLoadingOverlay();
        }
        return this.http.get<number>(this.ENDPOINTS.JOBS + `/open/intime/count`).pipe(
            tap(() => this.uiService.hideLoadingOverlay())
        );
    }

    public getOpenOverdueJobCount(skipSpinner = false): Observable<number> {
        if (!skipSpinner) {
            this.uiService.showLoadingOverlay();
        }
        return this.http.get<number>(this.ENDPOINTS.JOBS + `/open/overdue/count`).pipe(
            tap(() => this.uiService.hideLoadingOverlay())
        );
    }

    public createJob(job: Job) {
        this.uiService.showLoadingOverlay();
        return this.http.post<Job>(this.ENDPOINTS.JOB, job).pipe(
            map((job: any) => {
                this.uiService.hideLoadingOverlay();
                return Job.fromObject(job);
            })
        );
    }

    public changeJobById(job: Job): Observable<Job> {
        this.uiService.showLoadingOverlay();
        return this.http.post<Job>(this.ENDPOINTS.JOB + `/${job.id}`, job).pipe(
            map((job: any) => {
                this.uiService.hideLoadingOverlay();
                return Job.fromObject(job);
            })
        );
    }

    public setInvoiceNumber(job: Job, invoiceNumber: string): Observable<Job> {
        this.uiService.showLoadingOverlay();
        return this.http.post<Job>(this.ENDPOINTS.JOB + `/${job.id}/invoice`, {job: job, invoiceNumber: invoiceNumber}).pipe(
            map((job: any) => {
                this.uiService.hideLoadingOverlay();
                return Job.fromObject(job);
            })
        );
    }
}