import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from './HttpService/http.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  user=(JSON.parse(localStorage.getItem("BookStoreUser")!)); 
  constructor(private http:HttpService) { }
  getBooks(){
    return this.http.get(`${environment.baseUrl}/api/Book/Books`,'');
  }
  AddtoWishList(book:any)
  {
    let params={
      UserId: this.user.userId,
      BookId:book.bookId
    }
        return this.http.post(`${environment.baseUrl}/api/MywishList/WishList`,params);
  }

}
