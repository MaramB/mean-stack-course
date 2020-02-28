import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { NgForm } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Subscription } from 'rxjs';


@Component({
  selector: 'psprt-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class PsprtLoginComponent implements OnInit {
  err: string;
  sub: Subscription;

  constructor(private authService: AuthService, private flashMessage: FlashMessagesService) { }

  ngOnInit() {
    
  }

  showFlash() {
    // 1st parameter is a flash message text
    // 2nd parameter is optional. You can pass object with options.
    this.flashMessage.show('hi', { cssClass: 'alert-danger', timeout: 2000 });
}

  onLogin(form: NgForm) {
    if (form.invalid) return;

    this.authService.loginWithPassport(form.value.email, form.value.password);
    this.sub = this.authService.getErrMsgListener().subscribe( msg => { 
      this.err = msg;
      this.flashMessage.show(this.err, { cssClass: 'alert-danger', timeout: 5000 });
      this.sub.unsubscribe();
    });
      
  }

}
