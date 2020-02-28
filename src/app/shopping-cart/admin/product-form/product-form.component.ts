import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductService } from '../../product.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  product: Product = {_id: "", title: "", price: null, imageUrl: "", category: ""};


  constructor(private productService: ProductService) { }

  ngOnInit() {
  }

  save(form: NgForm) {
    this.productService.addProduct(form);
  }

}
