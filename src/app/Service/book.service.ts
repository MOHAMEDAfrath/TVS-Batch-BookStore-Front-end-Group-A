import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from './HttpService/http.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http:HttpService) { }
  getBooks(){
    return this.http.get(`${environment.baseUrl}/api/GetBooks`,'');
  }

}
