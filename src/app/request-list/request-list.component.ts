import { Component, OnInit, OnDestroy } from '@angular/core';
import { FriendsService } from '../friends.service';
import { Subscription } from 'rxjs';

import { Request } from '../models/request.model';
import { AuthService } from '../auth.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css']
})
export class RequestListComponent implements OnInit, OnDestroy {
  requests: Request[] = [];
  requestsInfo: {id: string, name: string}[] = [];
  requestsSub: Subscription;
  mySubscription: any;

  constructor(private friendsService : FriendsService, private authService: AuthService, private router: Router) { 
    
  }

  ngOnInit() {
    this.friendsService.getAllRequests();
    this.requestsSub = this.friendsService.getAllRequestsListener().subscribe(
      (requests: Request[]) => {
        this.requests = requests;
        this.requestsInfo = [];
        for (const n in this.requests ) {
          this.authService.getUser(this.requests[n].requester).subscribe(
            responseData => {
              this.requestsInfo.push(
                {id: responseData.userId, name: responseData.fullName} );
          });
        }
      });
  }

  ngOnDestroy() {
    this.requestsSub.unsubscribe();
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }

  onAccept(id: string) {
    this.authService.acceptFriend(id);
    this.friendsService.deleteRequest(id);
  }

  onReject(id: string) {
    this.friendsService.deleteRequest(id);
  }

}
