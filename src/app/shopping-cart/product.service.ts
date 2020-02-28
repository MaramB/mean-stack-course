import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products: Product[] = [];
  private productsListener = new Subject<Product[]>();

  constructor(private http: HttpClient) { }

  getProductsListener() { return this.productsListener.asObservable(); }

  addProduct(product) {
    this.http.post<{ product: Product, message: string }>('/api/products', product)
    .subscribe( result => { 
      this.products.push(result.product);
      this.productsListener.next(this.products);
    });
  }

  getProducts() {
    this.http.get<{ products: Product[], message: string }>('/api/products')
    .subscribe( result => {
      this.products = result.products;
      this.productsListener.next(this.products);
    });
  }
}
