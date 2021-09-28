import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './Components/forgot-password/forgot-password.component';
import { LoginComponent } from './Components/login/login.component';

const routes: Routes = [
  { path: 'forgotPassword', component: ForgotPasswordComponent },
  {path:'login',component:LoginComponent},
  
];
@NgModule({
  imports: [RouterModule.forRoot(routes)
  ,],
  exports: [RouterModule]
})
export class AppRoutingModule { }
