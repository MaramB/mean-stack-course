import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatBadgeModule} from '@angular/material/badge';
import {MatIconModule} from '@angular/material/icon';
import { AgmCoreModule } from '@agm/core';
import { FlashMessagesModule } from 'angular2-flash-messages';


import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { RequestListComponent } from './request-list/request-list.component';
import { PsprtSignupComponent } from './passport.auth/signup/signup.component';
import { PsprtLoginComponent } from './passport.auth/login/login.component';
import { JWTSignupComponent } from './jwt-auth/signup/signup.component';
import { JWTLoginComponent } from './jwt-auth/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { IndexComponent } from './index/index.component';
import { HeaderComponent } from './header/header.component';
import { AuthInterceptor } from './auth-interceptor';
import { MapComponent } from './maps/map/map.component';
import { ChatComponent } from './chat/chat/chat.component';
import { ProductsComponent } from './shopping-cart/products/products.component';
import { ProductFilterComponent } from './shopping-cart/product-filter/product-filter.component';
import { ProductFormComponent } from './shopping-cart/admin/product-form/product-form.component';
import { CartComponent } from './shopping-cart/cart/cart.component';
import { ChartComponent } from './chart/chart/chart.component';
import { UserComponent } from './user/user.component';

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    RequestListComponent,
    PsprtSignupComponent,
    PsprtLoginComponent,
    JWTSignupComponent,
    JWTLoginComponent,
    IndexComponent,
    HeaderComponent,
    MapComponent,
    ChatComponent,
    ProductsComponent,
    ProductFilterComponent,
    ProductFormComponent,
    CartComponent,
    ChartComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatToolbarModule,
    MatBadgeModule,
    MatIconModule,
    MatExpansionModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCaw_5EXo2q42Kbh0kGqkEZbEsFk8Cf9SU'
    }), 
    FlashMessagesModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
