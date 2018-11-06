import {Pipe, PipeTransform} from '@angular/core';
import * as _ from 'lodash';

@Pipe({name: 'highlight'})
export class HighlightPipe implements PipeTransform {
    transform(value: string, search: string): string {
        if (!_.isEmpty(search) && value.toLowerCase().indexOf(search.toLowerCase()) != -1) {
            const occuranceStartIndex = value.toLowerCase().indexOf(search.toLowerCase());
            value = `
                ${value.substring(0, occuranceStartIndex)}
                <mark class="p-0">${value.substring(occuranceStartIndex, occuranceStartIndex + search.length)}</mark>
                ${value.substring(occuranceStartIndex + search.length, value.length)}`;
        }
        return value;
    }
}