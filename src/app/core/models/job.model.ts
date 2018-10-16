import {User} from "./user.model";
import * as _ from 'lodash';

// TODO change to real class to handle for example no invoice number and delivery type
export class Job {
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