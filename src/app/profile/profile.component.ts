import { Component, OnInit, OnDestroy } from '@angular/core';
import { FriendsService } from '../friends.service';
import { Subscription } from 'rxjs';

import { Request } from '../models/request.model';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  
  userEmail = '';

  constructor(
    private friendsService: FriendsService, 
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router ) { }

  ngOnInit() {
    this.authService.thisUser().subscribe( (data: User) =>
      this.userEmail = data.email,
      error => this.router.navigate(['/psprt/login'])
    );
  }

  logout() {
    this.authService.logoutWithPassport().subscribe( (data) => { 
      console.log(data);
      this.router.navigate(['/']);
    },
    error => console.log(error)
    );
  }

  ngOnDestroy() {
    // this.requestSub.unsubscribe();
  }

}
 