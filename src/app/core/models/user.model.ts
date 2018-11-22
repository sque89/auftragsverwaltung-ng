import * as _ from 'lodash';
import {Role} from './role.model';
import {Task} from './task.model';

export class User {
    public readonly USER_ROLES: Array<Role> = [
        {id: 'ROLE_ADMIN', label: 'Administrator'},
        {id: 'ROLE_USER', label: 'Benutzer'}
    ];

    public static fromVoid() {
        return new User(null, '', '', '', '', null, [], false);
    }

    public static fromObject(data: any) {
        return new User(
            data.id,
            data.username,
            data.firstname,
            data.lastname,
            data.email,
            _.isObject(data.settings) ? data.settings : JSON.parse(data.settings),
            data.roles,
            data.isActive
        );
    }

    public constructor(
        public id: number,
        public username: string,
        public firstname: string,
        public lastname: string,
        public email: string,
        public settings: {dashboardWidgets: Array<string>},
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

    public ownsTask(task: Task) {
        return this.id === task.arranger.id;
    }

    public setDashboardWidgetSettings(settings: Array<string>) {
        if (!this.settings) {
            this.settings = {dashboardWidgets: settings};
        } else {
            this.settings.dashboardWidgets = settings;
        }
    }
}