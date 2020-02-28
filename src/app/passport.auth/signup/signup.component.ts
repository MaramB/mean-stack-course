import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/auth.service';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { FlashMessagesService } from 'angular2-flash-messages';


@Component({
  selector: 'psprt-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class PsprtSignupComponent implements OnInit, OnDestroy {
  user: User;
  userSub: Subscription;

  err: string;
  sub: Subscription;

  constructor(private authService: AuthService, private flashMessage: FlashMessagesService) { }

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

    this.authService.addUserWithPassport(form.value.email, form.value.password);
    this.sub = this.authService.getErrMsgListener().subscribe( msg => { 
      this.err = msg;
      this.flashMessage.show(this.err, { cssClass: 'alert-danger', timeout: 5000 });
      this.sub.unsubscribe();
    });
  }

} 
