import {Component, OnInit, EventEmitter} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Customer} from '../../core/models/customer.model';

@Component({
    selector: 'customer-detail',
    templateUrl: './customer-detail.component.html',
    styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailComponent implements OnInit {
    public customer: Customer;
    public gotoEditHappened: EventEmitter<null>;

    public constructor(private activatedRoute: ActivatedRoute, private router: Router) {
        this.gotoEditHappened = new EventEmitter();
    }

    public ngOnInit() {
        this.customer = this.activatedRoute.snapshot.data.CustomerSingleResolver;

        this.gotoEditHappened.subscribe(() => { this.router.navigate(['..', 'bearbeiten'], {relativeTo: this.activatedRoute}); });
    }
}
