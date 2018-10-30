import {User} from "./user.model";
import * as _ from 'lodash';
import {Moment} from "moment";
import * as moment from 'moment'
import {Customer} from "./customer.model";
import {Task} from "./task.model";

export class Job {
    public static fromVoid() {
        return new Job(null, null, null, null, null, '', '', '', null, [], [], null, null);
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
            data.tasks,
            moment(data.createdAt),
            moment(data.updatedAt)
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
        public tasks: Array<Task>,
        public createdAt: Moment,
        public updatedAt: Moment
    ) {
    }

    public getInvoiceNumber(): string {
        return this.invoiceNumber || '-';
    }

    public getPercentageTimeLeft() {
        const daysOverall = this.dateDeadline.diff(this.dateIncoming, 'days');
        const daysLeft = this.dateDeadline.diff(moment(), 'days');

        return daysLeft > 0 ? (daysLeft / daysOverall) * 100 : 0;
    }
}