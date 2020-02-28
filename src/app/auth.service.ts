import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './models/user.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new Subject<User>();
  users = new Subject<User[]>();
  userId: string;
  private token: string;
  errMsg: string;
  errMsgListener = new Subject<string>();

  constructor(private http: HttpClient, private router: Router) { }

  getErrMsgListener() { return this.errMsgListener.asObservable(); }

  getUserId() { return this.userId; }

  getToken() { return this.token; }

  getUsers() {
    this.http.get<{message: string, users: User[]}>('/api/user')
    .subscribe(responseData => {
      this.users.next(responseData.users);
    });
  }

  getUsersListener() { return this.users.asObservable(); }

  getUser( userId: string) {
    return this.http.get<{message: string, userId: string, email: string, friends: string[]}>('/api/user/' + userId,
    { withCredentials: true});
  }

  getUserListener() { return this.user.asObservable(); }

  addUserWithPassport(email, password) {
    const user = { email: email, password: password };
    this.http.post('/api/user/passport/signup', 
    user, { withCredentials: true })
      .subscribe( userData => {
        this.router.navigate(['/profile']);
      }, error => {
          this.errMsg = error.error.message;
          this.errMsgListener.next(this.errMsg);
      });
  }

  loginWithPassport(email, password) {
    const user = {email: email, password: password };
    this.http.post<{message: string}>('/api/user/passport/login', 
    user, { withCredentials: true })
    .subscribe( response => {
      this.router.navigate(['/profile']);
    }, error => {
      this.errMsg = error.error.message;
      this.errMsgListener.next(this.errMsg);
    });
  }

  logoutWithPassport() {
    return this.http.get<{message: string}>('/api/user/logout', 
    { withCredentials: true });
  }

  addUserWithJwt(name, username, email, password) {
    const user: User = {_id: null, name: name, username: username, email: email, password: password, friends: []};
    this.http.post<{user: User}>('/api/user/passport/signup', user)
    .subscribe( userData => {
      console.log(userData);
      user._id = userData.user._id;
      user.friends = userData.user.friends;
      this.user.next(userData.user);
      
    });
  }

  loginWithJwt(email, password) {
    const user = {email: email, password: password };
    this.http.post<{message: string}>('/api/user/passport/login', 
    user, { withCredentials: true })
    .subscribe( response => {
      // const token = response.token;
      // this.token = token;
      // if (token) {
      //   const expiresInDuration = response.expiresIn;
      //   // this.setAuthTimer(expiresInDuration);
      //   this.userId = response.userId;
      //   const now = new Date();
      //   const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
      //   this.saveAuthData(token, expirationDate, this.userId);
      //   this.router.navigate(['/']);
      //}
      console.log(response);
    }, error => {
      this.errMsg = error.error.message;
      this.errMsgListener.next(this.errMsg);
    });
  }

  thisUser() { //passport
    return this.http.get('/api/user/user',{ withCredentials: true });
  }

  logout() {
    return this.http.get('/api/user/logout',{ withCredentials: true });
  }

  acceptFriend(friendId: string) {
    this.http.put<{message: string}>('/api/user/' + friendId, null,
    { withCredentials: true })
    .subscribe(response => { console.log(response.message); 
    });
  } 

  private saveAuthData(token: string, expirationDate: Date, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
  }

}
