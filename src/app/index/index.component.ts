import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  users: User[] = [];

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.getUsers();
    this.authService.getUsersListener().subscribe(
      (users: User[]) => { this.users = users; 
        console.log(this.users);
      });
  }

}
