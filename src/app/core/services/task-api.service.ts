import * as _ from 'lodash';
import {environment} from '../../../environments/environment';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {UiService} from './ui.service';
import {Job} from '../models/job.model';
import {Task} from '../models/task.model';
import {User} from '../models/user.model';

@Injectable()
export class TaskApiService {
    public constructor(private http: HttpClient, private uiService: UiService) {}

    public createTask(task: Task, job: Job, user?: User) {
        const endpoint = user ? `task/${user.id}` : 'task';
        this.uiService.showLoadingOverlay();
        return this.http.post<Task>(`${environment.apiUrl}/${endpoint}`, {task: task, job: job}).pipe(
            tap(() => { this.uiService.hideLoadingOverlay(); })
        );
    }

    public changeTask(task: Task) {
        this.uiService.showLoadingOverlay();
        return this.http.post<Task>(`${environment.apiUrl}/task/${task.id}`, task).pipe(
            tap(() => { this.uiService.hideLoadingOverlay(); })
        );
    }
}