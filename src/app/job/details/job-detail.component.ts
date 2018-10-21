import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Job} from '../../core/models/job.model';

@Component({
    selector: 'job-detail',
    templateUrl: './job-detail.component.html',
    styleUrls: ['./job-detail.component.scss']
})
export class JobDetailComponent implements OnInit {
    public job: Job;

    public constructor(private activatedRoute: ActivatedRoute) {
        this.job = Job.fromVoid();
    }

    public ngOnInit() {
        this.job = this.activatedRoute.snapshot.data.JobSingleResolver;
    }
}
