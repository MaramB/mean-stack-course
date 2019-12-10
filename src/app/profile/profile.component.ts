import { Component, OnInit, OnDestroy } from '@angular/core';
import { FriendsService } from '../friends.service';
import { Subscription } from 'rxjs';

import { Request } from '../models/request.model';
import { AuthService } from '../auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  status: number;
  request: Request = {requester: "", recipient: "", status: 0 };
  requestSub: Subscription;
  userId: string;
  friendId: string;
  me: boolean = false;
  alreadyRequested: boolean = false;
  isAFriend: boolean = false;

  constructor(
    private friendsService: FriendsService, 
    private authService: AuthService,
    private route: ActivatedRoute ) { }

  ngOnInit() {
    this.userId = this.authService.getUserId();
    this.route.params.subscribe(
      params => { 
        this.friendId = params['id'];

        this.authService.getUser(this.userId).subscribe( responseUser => {
          for (const i in responseUser.friends ) {
            if (this.friendId === responseUser.friends[i]) this.isAFriend = true;
          }
        });

        this.friendsService.checkRequest(this.friendId);
        this.friendsService.getCheckRequestListener().subscribe(
          result => {if(result) this.alreadyRequested = true; }
        ); 


        this.friendsService.getRequest(this.friendId);
        this.requestSub = this.friendsService.getRequestListener().subscribe(
          (request: Request) => {
            console.log(request);
            if (this.userId === this.friendId) this.me=true;
            if (request) this.request = request;
            else this.request = {requester: "", recipient: "", status: 0 };
          });
          console.log(this.userId);
          console.log(this.friendId);
    });
  }

  onAddRequest() {
    this.friendsService.addRequest(this.userId, this.friendId);
  }

  onAccept(id: string) {
    this.authService.acceptFriend(id);
    this.friendsService.deleteRequest(id);
  }

  onReject(id: string) {
    this.friendsService.deleteRequest(id);
  }

  ngOnDestroy() {
    this.requestSub.unsubscribe();
  }

}
 