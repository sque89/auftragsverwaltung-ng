import {Injectable} from '@angular/core';
import {Job} from '../../core/models/job.model';
import {Task} from '../../core/models/task.model';
import {TaskFormDialogComponent} from '../dialogs/task/task-form-dialog.component';
import {TaskApiService} from '../../core/services/task-api.service';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import {NotificationService} from '../../core/services/notification.service';
import {catchError, switchMap} from 'rxjs/operators';
import {of, Observable, throwError} from 'rxjs';
import {TaskFormDialogData} from '../dialogs/task/data.model';
import * as _ from 'lodash';

@Injectable()
export class JobService {
    public constructor(
        private taskApiService: TaskApiService,
        private dialog: MatDialog,
        private notificationService: NotificationService
    ) {}

    private saveTask(job: Job, data: TaskFormDialogData): Observable<Task> {
        if (data.task.id) {
            return this.taskApiService.changeTask(data.task).pipe(
                switchMap(changedTask => {
                    job.tasks[job.tasks.findIndex(task => task.id === changedTask.id)] = changedTask;
                    this.notificationService.showSuccess('Buchung wurde geändert');
                    return of(changedTask);
                }),
                catchError((error) => {
                    if (error.status === 423) {
                        this.notificationService.showError('Der Datensatz wurde in der Zwischenzeit geändert. Bitte Eingaben merken und Datensatz neu laden');
                    } else {
                        this.notificationService.showError('Es ist ein Fehler bei der Änderung aufgetreten');
                    }
                    return throwError(null);
                })
            );
        } else {
            return this.taskApiService.createTask(data.task, job).pipe(
                switchMap(createdTask => {
                    job.tasks.push(createdTask);
                    this.notificationService.showSuccess('Aufwand wurde gebucht');
                    return of(createdTask);
                }),
                catchError(() => {
                    this.notificationService.showError('Es ist ein Fehler bei der Änderung aufgetreten');
                    return throwError(null);
                })
            );
        }
    }

    public showTaskFormDialog(job: Job, task?: Task): Observable<Task> {
        const dialogRef = this.dialog.open(TaskFormDialogComponent, {
            width: '50%',
            data: {task: _.cloneDeep(task) || {workingTime: null, description: null, date: null}, jobId: job.id}
        });

        return dialogRef.afterClosed().pipe(switchMap(data => {
            return data ? this.saveTask(job, data) : of(null);
        }));
    }
}
