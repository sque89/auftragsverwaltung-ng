import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {User} from '../../core/models/user.model';

@Component({
    selector: 'user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
    public users: Array<User>;

    public constructor(private activatedRoute: ActivatedRoute) {
        this.users = [];
    }
    
    public ngOnInit() {
        this.users = this.activatedRoute.snapshot.data.UserListResolver;
    }
}
