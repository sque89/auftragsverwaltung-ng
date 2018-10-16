import {environment} from '../../../environments/environment';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {User} from '../models/user.model';
import {UiService} from './ui.service';
import {Observable} from 'rxjs';
import {Job} from '../models/job.model';

@Injectable()
export class JobApiService {
    public constructor(private http: HttpClient, private uiService: UiService) {}

    public getAllJobs() {
        this.uiService.showLoadingOverlay();
        return this.http.get<Array<User>>(`${environment.apiUrl}/jobs`)
            .pipe(map((response: any) => {
                this.uiService.hideLoadingOverlay();
                const jobs: Array<Job> = [];
                response.jobs.forEach((job: any) => {
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
                return jobs;
            }));
    }
}