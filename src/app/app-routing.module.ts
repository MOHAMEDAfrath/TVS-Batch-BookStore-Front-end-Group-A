import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './Components/forgot-password/forgot-password.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { ResetPasswordComponent } from './Components/reset-password/reset-password.component';

const routes: Routes = [
  { path: 'forgotPassword', component: ForgotPasswordComponent },
  {path:'login',component:LoginComponent},
  {path:'resetpassword',component:ResetPasswordComponent},
  {path:'home',component:HomeComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)
  ,],
  exports: [RouterModule]
})
export class AppRoutingModule { }
