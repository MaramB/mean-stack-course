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

  constructor(private http: HttpClient, private router: Router) { }

  getUserId() { return this.userId; }

  getToken() { return this.token; }

  getUsers() {
    this.http.get<{message: string, users: User[]}>('api/user')
    .subscribe(responseData => {
      console.log(responseData);
      this.users.next(responseData.users);
    });
  }

  getUsersListener() { return this.users.asObservable(); }

  getUser( userId: string) {
    return this.http.get<{message: string, fullName: string, username: string, userId: string, friends: string[]}>('api/user/' + userId);
  }

  getUserListener() { return this.user.asObservable(); }

  addUser(name, username, email, password) {
    const user: User = {_id: null, name: name, username: username, email: email, password: password, friends: []};
    this.http.post<{message: string, user: User}>('api/user/signup', user)
    .subscribe( userData => {
      console.log(userData);
      user._id = userData.user._id;
      user.friends = userData.user.friends;
      this.user.next(userData.user);
      
    });
  }

  login(email, password) {
    const user = {email: email, password: password };
    this.http.post<{token: string, expiresIn: number, userId: string, username: string, friends: []}>('api/user/login', user)
    .subscribe( response => {
      const token = response.token;
      this.token = token;
      if (token) {
        const expiresInDuration = response.expiresIn;
        // this.setAuthTimer(expiresInDuration);
        this.userId = response.userId;
        const now = new Date();
        const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
        this.saveAuthData(token, expirationDate, this.userId);
        this.router.navigate(['/']);
      }
    });
  }

  acceptFriend(friendId: string) {
    const id = {userId: this.userId};
    console.log(id.userId);
    this.http.put<{message: string}>('api/user/' + friendId, id)
    .subscribe(response => { console.log(response.message); 
    });
  } 

  private saveAuthData(token: string, expirationDate: Date, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
  }

}
