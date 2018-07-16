import {Component, OnInit, ViewChild} from '@angular/core';
import {Customer} from '../../core/models/customer.model';
import {ActivatedRoute, Router} from '@angular/router';
import {UiService} from '../../core/services/ui.service';
import {MatSort, MatTableDataSource, MatPaginator} from '@angular/material';

@Component({
    selector: 'customer-list',
    templateUrl: './customer-list.component.html',
    styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {
    public customers: MatTableDataSource<Array<Customer>>;
    public columnsToDisplay: string[] = ['id', 'name', 'postcode', 'city', 'address', 'contactPerson', 'mail', 'phone', 'fax'];
    public pageSize = 10;
    public pageSizeOptions: number[] = [5, 10, 25, 100];

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    public constructor(private activatedRoute: ActivatedRoute, private uiService: UiService, private router: Router) {
    }

    public ngOnInit() {
        this.uiService.closeMainMenu();
        this.customers = new MatTableDataSource(this.activatedRoute.snapshot.data.CustomerListResolver);
        this.customers.sort = this.sort;
        this.customers.paginator = this.paginator;
    }

    public applyFilter(filterValue: string) {
        this.customers.filter = filterValue.trim().toLowerCase();
    }

    public showCustomerDetails(customer: Customer) {
        this.router.navigate(['/kunden', customer.id, 'details']);
    }
}
