import {environment} from '../../../environments/environment';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, tap} from 'rxjs/operators';
import {UiService} from './ui.service';
import {Customer} from '../models/customer.model';

@Injectable()
export class CustomerApiService {
    public constructor(private http: HttpClient, private uiService: UiService) {
    }

    public getAllCustomers() {
        this.uiService.showLoadingOverlay();
        return this.http.get<Array<Customer>>(`${environment.apiUrl}/customer`).pipe(
            tap(() => this.uiService.hideLoadingOverlay())
        );
    }

    public getCustomerById(id: number) {
        this.uiService.showLoadingOverlay();
        return this.http.get<Customer>(`${environment.apiUrl}/customer/${id}`).pipe(
            tap(() => this.uiService.hideLoadingOverlay())
        );
    }

    public getCustomersBySearchString(searchString: string, skipLoadingOverlay = false) {
        if (!skipLoadingOverlay) {
            this.uiService.showLoadingOverlay();
        }
        return this.http.get<Array<Customer>>(`${environment.apiUrl}/customer/find/${searchString}`).pipe(
            tap(() => this.uiService.hideLoadingOverlay())
        );
    }

    public changeCustomerById(customer: Customer) {
        this.uiService.showLoadingOverlay();
        return this.http.post<Customer>(`${environment.apiUrl}/customer/${customer.id}`, customer).pipe(
            tap(() => this.uiService.hideLoadingOverlay())
        );
    }

    public addCustomer(customer: Customer) {
        this.uiService.showLoadingOverlay();
        return this.http.put<Customer>(`${environment.apiUrl}/customer`, customer).pipe(
            tap(() => this.uiService.hideLoadingOverlay())
        );
    }
}