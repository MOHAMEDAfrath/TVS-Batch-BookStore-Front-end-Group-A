import { Injectable } from '@angular/core';
import { HttpService } from '../HttpService/http.service';
import { environment } from 'src/environments/environment';
import { HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  header:any;

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
    return this.http.post(`${environment.baseUrl}/api/User/Register`,userData);
  }
  Login(data:any){
    let userData = {
      EmailId: data.email,
      Password: data.password,
    }
    console.log(userData);
    return this.http.post(`${environment.baseUrl}/api/User/Login`,userData);
  }
  ForgotPassword(data:any)
  {
    console.log(data.email);
    return this.http.post(`${environment.baseUrl}/api/User/ForgotPassword?email=${data.email}`);

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
    return this.http.put(`${environment.baseUrl}/api/User/ResetPassword`,userData);
  }
  addAddress(data:any){
    let address = {
      UserId:this.user.userId,
      Address:data.address,
      Type:data.type,
      City:data.city,
      state:data.state
    }
    console.log(this.user.token);
    this.getToken();
    return this.http.post(`${environment.baseUrl}/api/Address/Address`,address,true,this.header);
  }
  getAddress(){
    console.log(this.user.token);
    //let params = new HttpParams().set('userId',this.user.userId);
    this.getToken();
    console.log(this.header);
    return this.http.post(`${environment.baseUrl}/api/Address/GetAddress?userId=${this.user.userId}`,null,true,this.header)
 
  }
  updateAddress(addressid:any,data:any)
  {
    let address = 
    {
      AddressId:addressid['addressId'],
      Type:data.type,
      UserId:this.user.userId,
      Address:data.address,
      City:data.city,
      state:data.state
    }
    console.log(this.user.token);
    this.getToken();
    return this.http.put(`${environment.baseUrl}/api/Address/Address`,address,true,this.header)

  }
  EditPersonDetail(data:any)
  {
    let userDetails = {
      UserId:this.user.userId,
      FullName: data.fullname,
      EmailId: data.email,
      Password: data.password,
      MobileNumber:data.mobile
    }
    return this.http.put(`${environment.baseUrl}/api/User/PersonalDetails`,userDetails);
  }

  getToken(){
    this.header = {
      headers: {Authorization: "Bearer " + this.user.token}
    }
  }
}

