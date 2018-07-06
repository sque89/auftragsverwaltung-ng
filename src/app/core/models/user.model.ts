import * as _ from 'lodash';
import {Role} from './role.model';

export class User {
    public readonly USER_ROLES: Array<Role> = [
        {id: 'ROLE_ADMIN', label: 'Administrator'},
        {id: 'ROLE_USER', label: 'Benutzer'}
    ];

    public constructor(
        public id: number,
        public username: string,
        public firstname: string,
        public lastname: string,
        public email: string,
        public roles: Array<string>,
        public isActive: boolean
    ) {}

    public getFullName(): string {
        return `${this.firstname} ${this.lastname}`;
    }

    public isAdministrator(): boolean {
        return _.includes(this.roles, 'ROLE_ADMIN');
    }

    public getRoleName(): string {
        let roles: string = "";
        this.USER_ROLES.forEach((role) => {
            if (_.includes(this.roles, role.id)) {
                roles += role.label + ', ';
            }
        });
        return roles.substr(0, roles.length -2);
    }
}