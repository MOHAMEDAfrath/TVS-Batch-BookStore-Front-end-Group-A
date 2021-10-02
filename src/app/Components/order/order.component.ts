import { Component, OnInit } from '@angular/core';
import { OrderServiceService } from 'src/app/Service/OrderService/order-service.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  OrderDetails:any;
  constructor(private orderService:OrderServiceService) { }

  ngOnInit(): void 
  {
    this.GetOrder();
  }
  GetOrder()
  {
    this.orderService.GetOrder()
    .subscribe((result:any)=>{
      this.OrderDetails = result.data;
      console.log(this.OrderDetails);
})

  }
}
