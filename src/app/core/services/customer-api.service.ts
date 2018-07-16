import {environment} from '../../../environments/environment';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {UiService} from './ui.service';
import {Customer} from '../models/customer.model';

@Injectable()
export class CustomerApiService {
    public constructor(private http: HttpClient, private uiService: UiService) {
    }

    public getAllCustomers() {
        this.uiService.showLoadingOverlay();
        return this.http.get<Array<Customer>>(`${environment.apiUrl}/customer`)
            .pipe(map((response: any) => {
                this.uiService.hideLoadingOverlay();
                const customers: Array<Customer> = [];
                response.customers.forEach((customer: any) => {
                    customers.push({
                        id: customer.id,
                        name: customer.name,
                        postcode: customer.postcode,
                        city: customer.city,
                        address: customer.address,
                        contactPerson: customer.contactPerson,
                        mail: customer.mail,
                        phone: customer.phone,
                        fax: customer.fax
                    });
                });
                return customers;
            }));
    }

    public getCustomerById(id: number) {
        this.uiService.showLoadingOverlay();
        return this.http.get<Customer>(`${environment.apiUrl}/customer/${id}`)
            .pipe(map((customer: any) => {
                this.uiService.hideLoadingOverlay();
                return {
                    id: customer.id,
                    name: customer.name,
                    postcode: customer.postcode,
                    city: customer.city,
                    address: customer.address,
                    contactPerson: customer.contactPerson,
                    mail: customer.mail,
                    phone: customer.phone,
                    fax: customer.fax
                };
            }));
    }

    public changeCustomerById(customer: Customer) {
        this.uiService.showLoadingOverlay();
        return this.http.post<Customer>(`${environment.apiUrl}/customer/${customer.id}`, customer)
            .pipe(map((customer: any) => {
                this.uiService.hideLoadingOverlay();
                return {
                    id: customer.id,
                    name: customer.name,
                    postcode: customer.postcode,
                    city: customer.city,
                    address: customer.address,
                    contactPerson: customer.contactPerson,
                    mail: customer.mail,
                    phone: customer.phone,
                    fax: customer.fax
                };
            }));
    }
}