import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { guestGuard } from '../guards/guest.guard';
import { authGuard } from '../guards/auth.guard';

const routes: Routes = [
  {path:'login',component:LoginComponent,canActivate:[guestGuard] },
  {path:'register',component:RegisterComponent,canActivate:[guestGuard]},
  {path:'profile',component:ProfileComponent,canActivate:[authGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
