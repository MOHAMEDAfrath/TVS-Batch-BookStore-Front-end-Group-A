import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isSearch = false
  books=['a','b','c','d','e']
  BookStoreUser =  JSON.parse(localStorage.getItem("BookStoreUser")!); 
  constructor(private route : Router) { }

  ngOnInit(): void {
    console.log(this.BookStoreUser);
  }
  Logout()
{
  if(this.BookStoreUser != null){
    localStorage.removeItem("BookStoreUser");
    this.route.navigateByUrl('/login');
}
}
}
