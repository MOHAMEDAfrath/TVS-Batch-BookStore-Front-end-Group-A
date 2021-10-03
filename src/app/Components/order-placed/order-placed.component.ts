import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-placed',
  templateUrl: './order-placed.component.html',
  styleUrls: ['./order-placed.component.scss']
})
export class OrderPlacedComponent implements OnInit {

  isSearch = false;
  option = 'Home';
  orderId : any;
  BookStoreUser =  JSON.parse(localStorage.getItem("BookStoreUser")!); 

  constructor(private route : Router) { }

  ngOnInit(): void {
    this.orderId = localStorage.getItem('OrderId');
    console.log("OrderID");
    console.log(this.orderId);
  }

  GoToHome()
  {
    this.route.navigateByUrl('/home');
  }

  Logout()
  {
    if(this.BookStoreUser != null){
      localStorage.removeItem("BookStoreUser");
      this.route.navigateByUrl('/login');
    }
  }

}
