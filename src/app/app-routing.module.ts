import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RequestListComponent } from "./request-list/request-list.component";
import { ProfileComponent } from "./profile/profile.component";
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";
import { IndexComponent } from "./index/index.component";
import { MapComponent } from "./maps/map/map.component";
import { ChatComponent } from "./chat/chat/chat.component";

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'requests', component: RequestListComponent },
  { path: 'profile/:id', component: ProfileComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'map', component: MapComponent },
  { path: 'chat', component: ChatComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
