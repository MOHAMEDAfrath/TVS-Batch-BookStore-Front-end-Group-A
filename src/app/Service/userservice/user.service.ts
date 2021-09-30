import { Injectable } from '@angular/core';
import { HttpService } from '../HttpService/http.service';
import { environment } from 'src/environments/environment';
import { HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpService) { }
  otp=(JSON.parse(localStorage.getItem("OTP")!)); 
  user=(JSON.parse(localStorage.getItem("BookStoreUser")!)); 
  Register(data: any) {
    let userData = {
      FullName: data.FullName,
      EmailId: data.Email,
      Password: data.Password,
      MobileNumber:data.Mobile
    }
    console.log(userData);
    return this.http.post(`${environment.baseUrl}/api/register`,userData);
  }
  Login(data:any){
    let userData = {
      EmailId: data.email,
      Password: data.password,
    }
    console.log(userData);
    return this.http.post(`${environment.baseUrl}/api/Login`,userData);
  }
  ForgotPassword(data:any)
  {
    console.log(data.email);
    return this.http.post(`${environment.baseUrl}/api/forgotPassword?email=${data.email}`);

  }
  ResetPassword(data:any)
  {
    console.log(this.otp.userId);
    console.log(this.otp);
    let userData = {
      emailId: this.otp.emailId,
      ConfirmPassword: data.password,
      UserId:this.otp.userId,
      Password:data.password
    }
    return this.http.put(`${environment.baseUrl}/api/ResetPassword`,userData);
  }
  addAddress(data:any){
    let address = {
      UserId:this.user.userId,
      Address:data.address,
      Type:data.type,
      City:data.city,
      state:data.state
    }
    return this.http.post(`${environment.baseUrl}/api/Address`,address);
  }
  getAddress(){
    let params = new HttpParams().set('userId',this.user.userId);
    return this.http.post(`${environment.baseUrl}/api/getAddress`,params);
  }
  updateAddress(addressid:any,data:any){
    let address = {
      AddressId:addressid['addressId'],
      Type:data.type,
      UserId:this.user.userId,
      Address:data.address,
      City:data.city,
      state:data.state
    }
    return this.http.put(`${environment.baseUrl}/api/updateAddress`,address);
  }
}

