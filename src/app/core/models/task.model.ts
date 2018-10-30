import {User} from "./user.model";

export interface Task {
    id: number;
    description: string;
    workingTime: number;
    arranger: User;
}