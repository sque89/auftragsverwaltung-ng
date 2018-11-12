import {User} from "./user.model";
import {Moment} from "moment";
import {Customer} from "./customer.model";
import {Task} from "./task.model";
import * as _ from 'lodash';
import * as moment from 'moment'

export class Job {
    public tasks: Array<Task>;

    public static fromVoid() {
        return new Job(null, null, null, null, null, '', '', '', null, [], null, null, null, []);
    }

    public static fromObject(data: any) {
        return new Job (
            data.id,
            moment(data.dateIncoming),
            moment(data.dateDeadline),
            data.customer,
            data.deliveryType,
            data.description,
            data.notes,
            data.externalPurchase,
            data.invoiceNumber,
            data.arrangers,
            moment(data.createdAt),
            moment(data.updatedAt),
            data.version,
            data.tasks
        );
    }

    public constructor(
        public id: string,
        public dateIncoming: Moment,
        public dateDeadline: Moment,
        public customer: Customer,
        public deliveryType: number,
        public description: string,
        public notes: string,
        public externalPurchase: string,
        public invoiceNumber: string,
        public arrangers: Array<User>,
        public createdAt: Moment,
        public updatedAt: Moment,
        public version: number,
        tasks: Array<Task>
    ) {
        this.tasks = [];
        tasks && tasks.forEach(task => {
            this.tasks.push(Task.fromObject(task));
        });
    }

    public getInvoiceNumber(): string {
        return this.invoiceNumber || '-';
    }

    public getPercentageTimeLeft() {
        const daysOverall = this.dateDeadline.diff(this.dateIncoming, 'days');
        const daysLeft = this.dateDeadline.diff(moment(), 'days');

        return daysLeft > 0 ? (daysLeft / daysOverall) * 100 : 0;
    }

    public getOverallWorkingTimeInMinutes(): number {
        return this.tasks.reduce((acc: number, cv: Task) => acc + cv.workingTime, 0);
    }

    public isClosed(): boolean {
        return _.isString(this.invoiceNumber);
    }

    public isOverdue() {
        return this.dateDeadline.isBefore(moment().utc(), 'day');
    }
}