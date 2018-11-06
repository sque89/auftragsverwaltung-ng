import {Component, OnInit, EventEmitter, Input} from '@angular/core';
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

    @Input() inputJob: Job;
    @Input() summaryMode: boolean;
    @Input() textToHighlight: string;

    public constructor(private activatedRoute: ActivatedRoute, private router: Router) {
        this.job = Job.fromVoid();
        this.gotoEditHappened = new EventEmitter();
    }

    public ngOnInit() {
        if (this.activatedRoute.snapshot.data.JobSingleResolver) {
            this.job = Job.fromObject(this.activatedRoute.snapshot.data.JobSingleResolver);
        } else {
            this.job = this.inputJob;
        }
        this.gotoEditHappened.subscribe(() => {this.router.navigate(['..', 'bearbeiten'], {relativeTo: this.activatedRoute});})
    }
}
