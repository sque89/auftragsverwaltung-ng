import {User} from "./user.model";

// TODO change to real class to handle for example no invoice number and delivery type
export interface Job {
    id: string;
    dateIncoming: Date;
    dateDeadline: Date;
    deliveryType: number;
    description: string;
    notes: string;
    externalPurchase: string;
    invoiceNumber: string;
    arrangers: Array<User>;
    createdAt: Date;
    updatedAt: Date;
}