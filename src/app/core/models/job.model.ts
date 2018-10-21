import {User} from "./user.model";
import * as _ from 'lodash';

// TODO change to real class to handle for example no invoice number and delivery type
export class Job {
    public static fromVoid() {
        return new Job(null, null, null, null, '', '', '', null, [], null, null)
    }

    public static fromObject(data: any) {
        return new Job (
            data.id,
            data.dateIncoming,
            data.dateDeadline,
            data.deliveryType,
            data.description,
            data.notes,
            data.externalPurchase,
            data.invoiceNumber,
            data.arrangers,
            data.createdAt,
            data.updatedAt
        )
    }

    public constructor(
        public id: string,
        public dateIncoming: Date,
        public dateDeadline: Date,
        public deliveryType: number,
        public description: string,
        public notes: string,
        public externalPurchase: string,
        public invoiceNumber: string,
        public arrangers: Array<User>,
        public createdAt: Date,
        public updatedAt: Date
    ) {
    }

    public getInvoiceNumber(): string {
        return this.invoiceNumber || '-';
    }
}