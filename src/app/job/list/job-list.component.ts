import {Component, ViewChild} from '@angular/core';
import {Job} from '../../core/models/job.model';
import {MatTableDataSource, MatSort, MatPaginator} from '@angular/material';
import {UiService} from '../../core/services/ui.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'job-list',
    templateUrl: './job-list.component.html',
    styleUrls: ['./job-list.component.scss']
})
export class JobListComponent {
    public jobs: MatTableDataSource<Array<Job>>;
    public columnsToDisplay: string[] = ['id', 'dateIncoming'];
    public pageSize = 10;
    public pageSizeOptions: number[] = [5, 10, 25, 100];

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    public constructor(private uiService: UiService, private activatedRoute: ActivatedRoute, private router: Router) {
    }

    public ngOnInit() {
        this.uiService.closeMainMenu();
        this.jobs = new MatTableDataSource(this.activatedRoute.snapshot.data.JobListResolver);
        this.jobs.sort = this.sort;
        this.jobs.paginator = this.paginator;
    }

    public applyFilter(filterValue: string) {
        this.jobs.filter = filterValue.trim().toLowerCase();
    }

    public showJobDetails(job: Job) {
        this.router.navigate(['/jobs', job.id, 'details']);
    }
}
