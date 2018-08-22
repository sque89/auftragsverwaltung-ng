import {User} from "./user.model";

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