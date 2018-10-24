import {EventEmitter} from "@angular/core";

export interface ActionButton {
    action: EventEmitter<boolean>;
    color: string;
    title: string;
    icon: string;
}