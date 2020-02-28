import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RequestListComponent } from "./request-list/request-list.component";
import { ProfileComponent } from "./profile/profile.component";
import { PsprtLoginComponent } from "./passport.auth/login/login.component";
import { PsprtSignupComponent } from "./passport.auth/signup/signup.component";
import { JWTLoginComponent } from "./jwt-auth/login/login.component";
import { JWTSignupComponent } from "./jwt-auth/signup/signup.component";
import { IndexComponent } from "./index/index.component";
import { ChatComponent } from "./chat/chat/chat.component";
import { ProductsComponent } from "./shopping-cart/products/products.component";
import { ProductFormComponent } from "./shopping-cart/admin/product-form/product-form.component";
import { CartComponent } from "./shopping-cart/cart/cart.component";
import { ChartComponent } from "./chart/chart/chart.component";
import { UserComponent } from "./user/user.component";

const routes: Routes = [
  { path: '', component: ChatComponent }
  // { path: 'user/:id', component: UserComponent },
  // { path: 'profile', component: ProfileComponent },
  // { path: 'requests', component: RequestListComponent },
  // { path: 'psprt/login', component: PsprtLoginComponent },
  // { path: 'psprt/signup', component: PsprtSignupComponent},
  // { path: 'jwt/login', component: JWTLoginComponent },
  // { path: 'jwt/signup', component: JWTSignupComponent},
  // { path: 'chat', component: ChatComponent },
  // { path: 'chart', component: ChartComponent },
  // { path: 'products', component: ProductsComponent },
  // { path: 'shopping-cart', component: CartComponent },
  // { path: 'admin/products', component: ProductFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
