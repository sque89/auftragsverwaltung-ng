import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import {SessionService} from '../services/session.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    public constructor(private sessionService: SessionService) {
    }

    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.sessionService.isSessionActive()) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${this.sessionService.getSessionToken()}`
                }
            });
        }

        return next.handle(request);
    }
}