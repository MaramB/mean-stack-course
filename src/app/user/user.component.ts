import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user.model';
import { FriendsService } from '../friends.service';
import { Request } from '../models/request.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  friendId: string;
  userId: string;
  isAFriend: boolean;
  alreadyRequested: boolean;
  me: boolean;
  requestSub: Subscription;
  request: Request;

  constructor(
    private authService: AuthService, 
    private friendsService: FriendsService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    // this.userId = this.authService.getUserId();
    this.authService.thisUser().subscribe( (data: User) => {
      this.userId = data._id;
      this.route.params.subscribe(
        params => { 
          this.friendId = params['id'];
  
          this.authService.getUser(this.userId).subscribe( responseUser => {
            for (const i in responseUser.friends ) {
              if (this.friendId === responseUser.friends[i]) this.isAFriend = true;
            }
          });
          this.friendsService.checkRequest(this.friendId);
          this.friendsService.getCheckRequestListener().subscribe( result => {
            console.log(result);
            if(result) this.alreadyRequested = true; 
          }); 
  
  
          this.friendsService.getRequest(this.friendId);
          this.requestSub = this.friendsService.getRequestListener().subscribe(
            (request: Request) => { 
              if (this.userId === this.friendId) this.me=true;
              if (request) this.request = request;
              else this.request = {requester: "", recipient: "", status: 0 };
            });

      });
    },
      error => this.router.navigate(['/psprt/login'])
    );

  }

  onAddRequest() {
    this.friendsService.addRequest(this.userId, this.friendId);
  }

  onAccept(id: string) {
    this.authService.acceptFriend(id);
    this.friendsService.deleteRequest(id);
    this.isAFriend = true;
  }

  onReject(id: string) {
    this.friendsService.deleteRequest(id);
    this.alreadyRequested = false;
    
  }

}
