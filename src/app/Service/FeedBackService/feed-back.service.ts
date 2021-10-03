import { Injectable } from '@angular/core';
import { HttpService } from '../HttpService/http.service';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class FeedBackService {

  constructor(private http:HttpService) { }
  header:any;
  user = (JSON.parse(localStorage.getItem("BookStoreUser")!));
  getToken() {
    this.header = {
      headers: { Authorization: "Bearer " + this.user.token }
    }
  }

  addcomment(data:any,id:any){
    let params = {
      BookId: id,
      UserName:this.user.fullName,
      Rating: parseInt(data.rate),
      Comment:data.comment
    }
    this.getToken();
    return this.http.post(`${environment.baseUrl}/api/FeedBack/FeedBack`,params,true,this.header);
  }
  getFeedBack(id:any)
  {
    this.getToken();
    return this.http.get(`${environment.baseUrl}/api/FeedBack/FeedBack?bookId=${id}`,'',true,this.header);
  }
}
