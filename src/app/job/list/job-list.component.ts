import {Component} from '@angular/core';
import {Job} from '../../core/models/job.model';
import {MatDialog} from '@angular/material';
import {UiService} from '../../core/services/ui.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AppService} from '../../core/services/app.service';
import {FormGroup, FormControl} from '@angular/forms';
import {JobApiService} from '../../core/services/job-api.service';
import {debounceTime} from 'rxjs/operators';
import {TaskFormDialogComponent} from '../dialogs/task/task-form-dialog.component';
import * as _ from 'lodash';
import * as moment from 'moment'
import {TaskApiService} from '../../core/services/task-api.service';
import {NotificationService} from '../../core/services/notification.service';
import {Task} from '../../core/models/task.model';
import {Subject} from 'rxjs';

@Component({
    selector: 'job-list',
    templateUrl: './job-list.component.html',
    styleUrls: ['./job-list.component.scss']
})
export class JobListComponent {
    private jobs: Array<Job>;
    private search: string;

    public filteredJobs: Array<{opened: boolean, job: Job}>;
    public pageSize = this.appService.getSettingById('job_list_jobs_per_page').value;
    public pageSizeOptions: number[] = [5, 10, 25, 100];
    public sortDirectionAsc: boolean;
    public filterForm: FormGroup;
    public updateTaskTable: Subject<void>;

    public constructor(
        private uiService: UiService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private appService: AppService,
        private jobApiService: JobApiService,
        private taskApiService: TaskApiService,
        private dialog: MatDialog,
        private notificationService: NotificationService
    ) {
        this.search = ''
        this.updateTaskTable = new Subject();
        this.sortDirectionAsc = false;
    }

    public ngOnInit() {
        this.uiService.closeMainMenu();
        this.jobs = this.activatedRoute.snapshot.data.JobListResolver;
        this.sortJobs('id', this.sortDirectionAsc);
        this.filterJobs();
        this.filterForm = new FormGroup({
            from: new FormControl(moment().subtract(parseInt(this.appService.getSettingById('job_list_default_timespan').value), 'days').startOf('day')),
            to: new FormControl(moment().endOf('day')),
            search: new FormControl(this.search),
            sort: new FormControl('id')
        });
        this.bindFilterChanges();
    }

    private bindFilterChanges() {
        this.filterForm.controls['from'].valueChanges.subscribe(() => {
            this.jobApiService.getJobsInTimespan(this.filterForm.controls['from'].value, this.filterForm.controls['to'].value).subscribe((jobs) => {
                this.jobs = jobs;
                this.filterJobs();
            });
        });
        this.filterForm.controls['to'].valueChanges.subscribe(values => {
            this.jobApiService.getJobsInTimespan(this.filterForm.controls['from'].value, this.filterForm.controls['to'].value).subscribe((jobs) => {
                this.jobs = jobs;
                this.filterJobs();
            });
        });
        this.filterForm.controls['search'].valueChanges.pipe(
            debounceTime(500)
        ).subscribe((newSearch: string) => {
            this.search = newSearch;
            this.filterJobs();
        });
        this.filterForm.controls['sort'].valueChanges.subscribe((newSortMode: string) => {
            this.sortJobs(newSortMode, this.sortDirectionAsc);
            this.filterJobs();
        });
    }

    private filterJobs(): void {
        this.filteredJobs = [];
        this.jobs.forEach((job: Job) => {
            if (
                job.id.toLowerCase().includes(this.search.toLowerCase()) ||
                job.description.toLowerCase().includes(this.search.toLowerCase()) ||
                job.externalPurchase.toLowerCase().includes(this.search.toLowerCase()) ||
                job.notes.toLowerCase().includes(this.search.toLowerCase()) ||
                job.customer.name.toLowerCase().includes(this.search.toLowerCase())
            ) {
                this.filteredJobs.push({opened: !_.isEmpty(this.search), job: job});
            }
        });
    }

    private sortJobs(property: string, asc = false): void {
        this.jobs.sort((a: Job, b: Job) => {
            if (asc) {
                if (a[property] < b[property]) {
                    return -1
                } else if (a[property] === b[property]) {
                    return 0;
                } else {
                    return 1;
                }
            } else {
                if (a[property] > b[property]) {
                    return -1
                } else if (a[property] === b[property]) {
                    return 0;
                } else {
                    return 1;
                }
            }
        });
    }

    public changeSortDirection(): void {
        this.sortDirectionAsc = !this.sortDirectionAsc;
        this.sortJobs(this.filterForm.controls['sort'].value, this.sortDirectionAsc);
        this.filterJobs();
    }

    public showJobDetails(job: Job): void {
        this.router.navigate(['/jobs', job.id, 'details']);
    }

    public showTaskFormDialog(job: Job, task?: Task): void {
        const dialogRef = this.dialog.open(TaskFormDialogComponent, {
            width: '50%',
            data: {task: _.cloneDeep(task) || {workingTime: '', description: ''}, jobId: job.id}
        });

        dialogRef.afterClosed().subscribe(data => {
            if (data) {
                if (data.task.id) {
                    this.taskApiService.changeTask(data.task).subscribe((changedTask) => {
                        job.tasks[job.tasks.findIndex(task => task.id === changedTask.id)] = changedTask;
                        this.updateTaskTable.next();
                        this.notificationService.showSuccess('Buchung wurde geändert');
                    }, () => {
                        this.notificationService.showError('Es ist ein Fehler bei der Änderung aufgetreten');
                    });
                } else {
                    this.taskApiService.createTask(data.task, job).subscribe((createdTask) => {
                        job.tasks.push(createdTask);
                        this.updateTaskTable.next();
                        this.notificationService.showSuccess('Aufwand wurde gebucht');
                    }, () => {
                        this.notificationService.showError('Es ist ein Fehler bei der Buchung aufgetreten');
                    });
                }
            }
        });
    }
}
