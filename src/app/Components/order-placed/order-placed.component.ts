import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { DataService } from 'src/app/Service/dataservice/data.service';

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

  constructor(private route : Router,private data:DataService) { }

  ngOnInit(): void {
    this.data.currentMessage.subscribe((result:any)=>{
      console.log(result);
      if(result!="Empty"){
      this.orderId = result;
      this.data.changeMessage("Empty")
        console.log(result);
      }
    })
  
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
