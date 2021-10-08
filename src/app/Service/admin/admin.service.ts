import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpService } from '../HttpService/http.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpService) { }
  header:any=null;

  AddBook(bookDetail:any)
  {
    return this.http.post(`${environment.baseUrl}/api/Book/Book`,bookDetail);
  }
  updateBook(bookDetail:any){
    return this.http.put(`${environment.baseUrl}/api/Book/Book`,bookDetail);
  }
  deleteBook(id:any)
  {
    return this.http.delete(`${environment.baseUrl}/api/Book/Book?bookId=${id}`,'');
  }
}
