import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCart } from '../models/shopping-cart';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartServicee {

  sessionCart;
  sessionCartListener = new Subject<any>();

  products;
  productsListener = new Subject<[]>();

  totalPrice;
  totalPriceListener = new Subject<Number>();


  constructor(private http: HttpClient) { }

  getSessionCartListener() { return this.sessionCartListener.asObservable(); }

  getTotalPriceListener() { return this.totalPriceListener.asObservable(); }

  getProductsListener() { return this.productsListener.asObservable(); }

  add(productId) {
    this.http.get<{cart}>('/api/carts/add/' + productId, {
      withCredentials: true
    }).subscribe(
      data => {
        this.sessionCart = data.cart;
        this.sessionCartListener.next(this.sessionCart);
        this.shoppingCart();
      });
  }

  remove(productId) {
    this.http.get<{cart}>('/api/carts/remove/' + productId, {
      withCredentials: true
    }).subscribe(
      data => {
        this.sessionCart = data.cart;
        this.sessionCartListener.next(this.sessionCart);
        this.shoppingCart();
      });
  }

  clearCart() {
    this.http.delete<{cart}>('/api/carts/clear-cart', {
      withCredentials: true
    }).subscribe(
      data => {
        this.sessionCart = data.cart;
        this.sessionCartListener.next(this.sessionCart);
        this.shoppingCart();
      });
  }

  getSession() {
    this.http.get<{session}>('/api/carts', {withCredentials: true})
    .subscribe(data => {
      this.sessionCart = data.session.cart;
      this.sessionCartListener.next(this.sessionCart);
    });
  }

  shoppingCart() {
    this.http.get<{products, totalPrice}>('/api/carts/shopping-cart', {withCredentials: true})
    .subscribe(data => {
      this.products = data.products;
      this.productsListener.next(this.products);
      this.totalPrice = data.totalPrice;
      this.totalPriceListener.next(this.totalPrice);
    });
  }

  // addOrRemoveToCart(product: Product, quantity: number) {
  //   const shoppingCart = { title: product.title, price: product.price, quantity: quantity }
  //   this.cartId = localStorage.getItem('cartId');
  //   if (this.cartId) {
  //     this.http.put<{qty: number}>('/api/carts/' + this.cartId, shoppingCart)
  //     .subscribe( data => {
  //       this.itemQuantity = data.qty;
  //       this.itemQtyListener.next(this.itemQuantity);
  //     });
      
  //   }
  //   else {
  //     this.http.post<{message: string, cart: ShoppingCart}>('/api/carts', shoppingCart)
  //     .subscribe( responseData => {
  //       localStorage.setItem('cartId', responseData.cart._id);
  //     });
  //   }
    
  // }

  // getCart() {
  //   this.cartId = localStorage.getItem('cartId');
  //   if(this.cartId)
  //     this.http.get<{cart: ShoppingCart}>('/api/carts/' + this.cartId)
  //     .subscribe(responseData => {
  //       this.cart = responseData.cart;
  //       this.cartListener.next(this.cart);
  //     });
  //   }

  // getQuantity(product) {
  //   this.cartId = localStorage.getItem('cartId');
  //   this.http.get<{qty: number}>('/api/carts/' + this.cartId + '/' + product.title)
  //   .subscribe(data => {
  //     this.itemQuantity = data.qty;
  //     this.itemQtyListener.next(this.itemQuantity);
  //   });
    
  // }

}
