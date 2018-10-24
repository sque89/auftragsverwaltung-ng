import {Component, OnInit, EventEmitter} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../core/models/user.model';

@Component({
    selector: 'user-detail',
    templateUrl: './user-detail.component.html',
    styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
    public user: User;
    public isOwnProfile: boolean;
    public gotoEditHappened: EventEmitter<null>;

    public constructor(private activatedRoute: ActivatedRoute, private router: Router) {
        this.user = new User(null, '', '', '', '', [], true);
        this.isOwnProfile = false;
        this.gotoEditHappened = new EventEmitter();
    }

    public ngOnInit() {
        this.user = this.activatedRoute.snapshot.data.UserSingleResolver;
        this.isOwnProfile = this.activatedRoute.snapshot.data.isOwnProfile;

        this.gotoEditHappened.subscribe(() => { this.router.navigate(
            this.isOwnProfile ? ['..', 'profil', 'bearbeiten'] : ['..', 'bearbeiten'], {relativeTo: this.activatedRoute}
        )});
    }
}
