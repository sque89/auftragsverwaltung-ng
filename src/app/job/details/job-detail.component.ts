import {Component, OnInit, EventEmitter} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Job} from '../../core/models/job.model';

@Component({
    selector: 'job-detail',
    templateUrl: './job-detail.component.html',
    styleUrls: ['./job-detail.component.scss']
})
export class JobDetailComponent implements OnInit {
    public job: Job;
    public gotoEditHappened: EventEmitter<null>;

    public constructor(private activatedRoute: ActivatedRoute, private router: Router) {
        this.job = Job.fromVoid();
        this.gotoEditHappened = new EventEmitter();
    }

    public ngOnInit() {
        this.job = Job.fromObject(this.activatedRoute.snapshot.data.JobSingleResolver);
        this.gotoEditHappened.subscribe(() => { this.router.navigate(['..', 'bearbeiten'], {relativeTo: this.activatedRoute}); })
    }
}
