import {User} from "./user.model";
import {Moment} from "moment";
import * as moment from 'moment'

export class Task {
    public static fromVoid() {
        return new Task(null, '', null, 0, null, null, null);
    }

    public static fromObject(data: any) {
        return new Task (
            data.id,
            data.description,
            moment.utc(data.date),
            data.workingTime,
            data.arranger,
            data.createdAt,
            data.updatedAt
        );
    }

    public constructor(
        public id: number,
        public description: string,
        public date: Moment,
        public workingTime: number,
        public arranger: User,
        public createdAt: Moment,
        public updatedAt: Moment
    ) {}
}