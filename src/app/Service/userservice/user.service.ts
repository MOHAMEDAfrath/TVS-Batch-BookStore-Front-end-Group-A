import { Injectable } from '@angular/core';
import { HttpService } from '../HttpService/http.service';
import { environment } from 'src/environments/environment';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpService) { }
  Register(data: any) {
    let userData = {
      FullName: data.FullName,
      EmailId: data.Email,
      Password: data.Password,
      MobileNumber:data.Mobile
    }
    console.log(userData);
    return this.http.post(`${environment.baseUrl}/api/Register`,userData);
  }
  Login(data:any){
    let userData = {
      EmailId: data.email,
      Password: data.password,
    }
    console.log(userData);
    return this.http.post(`${environment.baseUrl}/api/Login`,userData);
  }
}
