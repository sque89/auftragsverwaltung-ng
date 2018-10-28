import {environment} from '../../../environments/environment';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DeliveryType} from '../models/delivery-type.model';
import {Observable} from 'rxjs';

@Injectable()
export class DeliveryTypeApiService {
    public constructor(private http: HttpClient) {}

    public fetchAll(): Observable<Array<DeliveryType>> {
        return this.http.get<Array<DeliveryType>>(`${environment.apiUrl}/delivery-types`);
    }
}

