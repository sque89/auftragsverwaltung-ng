import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class UtilService {
    public moveItemInArrayFromIndexToIndex (array: Array<any>, fromIndex: number, toIndex: number): Array<any> {
        if (fromIndex === toIndex) return array;

        const newArray = [...array];

        const target = newArray[fromIndex];
        const inc = toIndex < fromIndex ? -1 : 1;

        for (let i = fromIndex; i !== toIndex; i += inc) {
            newArray[i] = newArray[i + inc];
        }

        newArray[toIndex] = target;

        return newArray;
    };
}