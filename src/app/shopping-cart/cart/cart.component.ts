import { Component, OnInit } from '@angular/core';
import { CartServicee } from '../cart.servicee';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  totalPrice: Number;
  products: [];
  sessionCart;

  constructor(private cartService: CartServicee) { }

  ngOnInit() {
    this.cartService.getSession();
    this.cartService.getSessionCartListener().subscribe( sessionCart => {
      this.sessionCart = sessionCart;
    });

    this.cartService.shoppingCart();
    this.cartService.getTotalPriceListener().subscribe( totalPrice => {
      this.totalPrice = totalPrice;
    });
    this.cartService.getProductsListener().subscribe( products => {
      this.products = products;
    });
  }

  addToCart(productId) {
    this.cartService.add(productId);
  }

  removeFromCart(productId) {
    this.cartService.remove(productId);
  }

  clearCart() {
    this.cartService.clearCart();
  }

}
