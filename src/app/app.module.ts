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
import { AgmCoreModule } from '@agm/core';


import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { RequestListComponent } from './request-list/request-list.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { IndexComponent } from './index/index.component';
import { HeaderComponent } from './header/header.component';
import { AuthInterceptor } from './auth-interceptor';
import { MapComponent } from './maps/map/map.component';
import { ChatComponent } from './chat/chat/chat.component';

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    RequestListComponent,
    SignupComponent,
    LoginComponent,
    IndexComponent,
    HeaderComponent,
    MapComponent,
    ChatComponent
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
    MatExpansionModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCaw_5EXo2q42Kbh0kGqkEZbEsFk8Cf9SU'
    }),
    AppRoutingModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
