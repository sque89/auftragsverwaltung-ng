import {Component, Input} from '@angular/core';
import {Job} from '../../../core/models/job.model';

@Component({
    selector: 'job-list-widget',
    templateUrl: 'job-list-widget.component.html',
    styleUrls: ['job-list-widget.component.scss']
})
export class JobListWidgetComponent {
    @Input() jobs: Array<Job>

    public constructor() {
    }
}
