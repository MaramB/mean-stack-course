import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from 'src/app/models/product';
import { CartServicee } from '../cart.servicee';
import { ShoppingCart } from 'src/app/models/shopping-cart';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[];
  itemQuantity = 0;
  cart: ShoppingCart;
  items;
  sessionCart;


  constructor(private productService: ProductService, private cartServicee: CartServicee) { }

  ngOnInit() {
    this.productService.getProducts();
    this.productService.getProductsListener().subscribe((products: Product[]) => {
      this.products = products;
    });

    this.cartServicee.getSession();
    this.cartServicee.getSessionCartListener().subscribe( sessionCart => {
      this.sessionCart = sessionCart;
    });

    // this.cartServicee.getItemQtyListener().subscribe((qty: number) => {
    //   this.itemQuantity = qty; 
    //   console.log(this.itemQuantity);
    // });

    // this.cartServicee.getCart();
    // this.cartServicee.getCartListener().subscribe((cart: ShoppingCart) => {
    //   this.items = cart.items;
    //   console.log(this.items);
    // });
  }

  addToCart(product) {
    // this.cartServicee.addOrRemoveToCart(product, 1);
    // this.cartServicee.getItemQtyListener().subscribe((qty: number) => {
    //   this.itemQuantity = qty;
    //   console.log(this.itemQuantity);
    // });
    // this.items[i].quantity+=1;

    this.cartServicee.add(product._id);
    
  }

  removeFromCart(product) {
    this.cartServicee.remove(product._id);
  }

  // getQuantity(product) {
  //   if(!localStorage.getItem('cartId')) return 0;
    
  //   this.cartServicee.getQuantity(product);
  //   this.cartServicee.getItemQtyListener().subscribe((qty: number) => {
  //     this.itemQuantity = qty;
  //     return this.itemQuantity;
  //   });
  // }

}
