import {Injectable} from '@angular/core';
import {AppService} from '../../core/services/app.service';
import {Job} from '../../core/models/job.model';
import {Moment} from 'moment';
import * as moment from 'moment'

@Injectable()
export class JobFilterService {
    public jobsInTimespan: Array<Job>;
    public filterFrom: Moment;
    public filterTo: Moment;
    public searchString: string;
    public sortColumn: string;
    public sortDirectionAsc: boolean;
    public filterOpen: boolean;
    public filterClosed: boolean;
    public filterOverdue: boolean;

    public constructor(private appService: AppService) {
        this.jobsInTimespan = [];
        this.filterFrom = moment().subtract(parseInt(this.appService.getSettingById('job_list_default_timespan').value), 'days').startOf('day');
        this.filterTo = moment().endOf('day');
        this.searchString = '';
        this.sortColumn = 'id';
        this.sortDirectionAsc = false;
        this.filterOpen = true;
        this.filterClosed = false;
        this.filterOverdue = false;
    }
}
