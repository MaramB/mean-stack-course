import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
import { User } from '../models/user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  user: User;
  userSub: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.userSub = this.authService.getUserListener().subscribe(
      (userData: User) => {console.log(userData)}
    );
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  onSignup(form: NgForm) {
    if (form.invalid) return;

    this.authService.addUser(form.value.fullName, form.value.username, form.value.email, form.value.password);
  }

} 
