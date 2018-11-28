import {Pipe, PipeTransform} from '@angular/core';
import * as _ from 'lodash';

@Pipe({name: 'highlight'})
export class HighlightPipe implements PipeTransform {
    transform(value: string, search: string): string {
        if (!_.isEmpty(search)) {
            const searchStrings: Array<string> = [];
            if (search.startsWith('"') && search.endsWith('"')) {
                searchStrings.push(search.replace(/\"/g, ''));
            } else {
                search.split(' ').forEach(part => searchStrings.push(part));
            }

            searchStrings.forEach((searchString) => {
                const occuranceStartIndex = value.toLowerCase().indexOf(searchString.toLowerCase());
                if (occuranceStartIndex !== -1) {
                    value = `
                        ${value.substring(0, occuranceStartIndex)}
                        <mark class="p-0">${value.substring(occuranceStartIndex, occuranceStartIndex + searchString.length)}</mark>
                        ${value.substring(occuranceStartIndex + searchString.length, value.length)}
                    `;
                }
            });
        }
        return value;
    }
}