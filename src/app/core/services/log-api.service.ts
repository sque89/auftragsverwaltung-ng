import {environment} from '../../../environments/environment';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class LogApiService {
    public constructor(private http: HttpClient) {}

    public logError(message: string, stack: string): void {
        this.http.put(`${environment.apiUrl}/log`, {message: message, callStack: stack}).subscribe();
    }
}

