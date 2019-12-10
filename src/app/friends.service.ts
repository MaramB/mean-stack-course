import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import { Request } from './models/request.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FriendsService {

  private request: Request;
  private currentRequest = new Subject<Request>();

  private requests: Request[] = [];
  private allRequests = new Subject<Request[]>();

  private checkedRequest: Request;
  private getCheckRequest = new Subject<Request>();


  constructor(private http: HttpClient, private authService: AuthService) { }

  getAllRequests() {
    this.http.get<{message: string, requests: Request[]}>('api/requests')
    .subscribe( requestsData => {
      console.log(requestsData);
      this.requests = requestsData.requests;
      this.allRequests.next(this.requests);
    });
  }

  getAllRequestsListener() {
    return this.allRequests.asObservable();
  }

  getRequest(friendId: string) {
    this.http.get<{message: string, request: Request}>('api/requests/' + friendId)
    .subscribe( requestsData => {
      this.request = requestsData.request;
      this.currentRequest.next(this.request);
    });
  }

  checkRequest(friendId: string) {
    this.http.get<{message: string, request: Request}>('api/requests/check/' + friendId)
    .subscribe( requestsData => {
      console.log(requestsData.message);
      this.checkedRequest = requestsData.request;
      this.getCheckRequest.next(this.checkedRequest);
    });
  }

  getCheckRequestListener() { return this.getCheckRequest.asObservable(); }

  getRequestListener() {
    return this.currentRequest.asObservable();
  }

  addRequest(userId: string, friendId: string) {
    const request: Request = {requester: userId, recipient: friendId, status: 1};
    this.http.post<{message: string, request: Request}>('api/requests', request)
      .subscribe((responseData) => {
        this.request = responseData.request;
        this.currentRequest.next(this.request);
      });
  }

  deleteRequest(requesterId: string) {
    const userId = this.authService.getUserId()
    this.http.delete<{message: string}>('api/requests/' + requesterId)
    .subscribe( response => {
      console.log(response.message);
      // console.log(this.requests);
      this.getAllRequests();
    });
  }
}
