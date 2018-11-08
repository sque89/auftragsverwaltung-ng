import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NumberService {
    public minutesToHourMinuteString(minutes: number): string {
        return `${Math.floor(minutes / 60)}:${minutes % 60 < 10 ? '0' + minutes % 60 : minutes % 60} Std.`;
    }
}