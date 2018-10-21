import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {User} from '../../core/models/user.model';

@Component({
    selector: 'user-detail',
    templateUrl: './user-detail.component.html',
    styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
    public user: User;
    public isOwnProfile: boolean;

    public constructor(private activatedRoute: ActivatedRoute) {
        this.user = new User(null, '', '', '', '', [], true);
        this.isOwnProfile = false;
    }

    public ngOnInit() {
        this.user = this.activatedRoute.snapshot.data.UserSingleResolver;
        this.isOwnProfile = this.activatedRoute.snapshot.data.isOwnProfile;
    }
}
