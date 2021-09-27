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
    let params = {
      fullName: data.FullName,
      emailId: data.Email,
      password: data.Password,
      mobileNumber:data.Mobile
    }
    console.log(params)
    // let header = new HttpHeaders();
    // header.set("Content-Type","application/json");
    return this.http.post(`${environment.baseUrl}/api/Register`,params);
  }
}
