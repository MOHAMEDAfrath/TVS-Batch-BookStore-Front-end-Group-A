import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpService } from '../HttpService/http.service';

@Injectable({
  providedIn: 'root'
})
export class OrderServiceService {
  header: any;
  user = (JSON.parse(localStorage.getItem("BookStoreUser")!));

  constructor(private http:HttpService) { }

GetOrder()
{
  this.getToken();
  return this.http.get(`${environment.baseUrl}/api/MyOrders/Orders?userId=${this.user.userId}`,'',true,this.header);
}

getToken() {
  this.header = {
    headers: { Authorization: "Bearer " + this.user.token }
  }
}

AddToOrders(params:any)
{
   this.getToken();
    return this.http.post(`${environment.baseUrl}/api/MyOrders/Order`, params,true,this.header);
}

}