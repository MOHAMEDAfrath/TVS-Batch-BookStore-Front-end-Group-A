import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './Components/forgot-password/forgot-password.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { ResetPasswordComponent } from './Components/reset-password/reset-password.component';
import { OrderPlacedComponent } from './Components/order-placed/order-placed.component';
import { AdminComponent } from './Components/admin/admin.component';


const routes: Routes = [
  { path: 'forgotPassword', component: ForgotPasswordComponent },
  {path:'login',component:LoginComponent},
  {path:'resetPassword',component:ResetPasswordComponent},
  {path:'home',component:HomeComponent},
  {path: 'orderPlaced',component:OrderPlacedComponent},
  {path:'admin/home',component:AdminComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)
  ,],
  exports: [RouterModule]
})
export class AppRoutingModule { }
