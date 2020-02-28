import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/auth.service';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';



@Component({
  selector: 'jwt-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class JWTSignupComponent implements OnInit, OnDestroy {
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

    this.authService.addUserWithJwt(form.value.fullName, form.value.username, form.value.email, form.value.password);
  }

} 
