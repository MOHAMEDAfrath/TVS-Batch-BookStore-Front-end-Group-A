import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpService } from '../HttpService/http.service';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  header:any;
  user = (JSON.parse(localStorage.getItem("BookStoreUser")!));
  constructor(private http: HttpService) { }

  AddtoWishList(book: any) {
    let params = {
      UserId: this.user.userId,
      BookId: book.bookId
    }
    this.getToken();
    return this.http.post(`${environment.baseUrl}/api/MyWishList/WishList`, params,true,this.header);
  }
  GetWishList()
  {
    this.getToken();
    return this.http.get(`${environment.baseUrl}/api/MyWishList/WishList?userId=${this.user.userId}`,'',true,this.header);
  }
  getToken() {
    this.header = {
      headers: { Authorization: "Bearer " + this.user.token }
    }
  }

}
