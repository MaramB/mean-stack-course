import { Component, OnInit } from '@angular/core';
import { CartServicee } from '../shopping-cart/cart.servicee';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  sessionCart;
  isLoggedIn = false;

  constructor(private cartServicee: CartServicee, private authService: AuthService) { }

  ngOnInit() {
    this.authService.thisUser().subscribe( 
      data => { if(data) this.isLoggedIn = true;
    },
    error => this.isLoggedIn = false
    );
    
    this.cartServicee.getSession();
    this.cartServicee.getSessionCartListener().subscribe( sessionCart => {
      this.sessionCart = sessionCart;
    });
  }

}
