import { Component, OnInit } from '@angular/core';
import { FormGroup ,FormControl,Validators} from '@angular/forms';
import { UserService } from 'src/app/Service/userservice/user.service';
import { CartService } from 'src/app/Service/cartService/cart.service';
import { OrderServiceService } from 'src/app/Service/OrderService/order-service.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { DataService } from 'src/app/Service/dataservice/data.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(private userService:UserService, private cartService:CartService,
    private orderService:OrderServiceService,
    private route: Router,
    private snackBar:MatSnackBar,
    private data:DataService) { }
  user = JSON.parse(localStorage.getItem('BookStoreUser')!);
  cart=[1];
  placeorder:any='order';
  addedit = false;
  edit = false;
  newadd = false;
  address = false;
  expand = false;
  result1=0;
  cartDetails : any =[] ;
  checked: any;
  radio:string='';
  AddressForm!:FormGroup
  userAddress:any;
  orderId:any;
  monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"
];
  ngOnInit(): void {
    this.GetCart();
    this.getAddress();
    this.AddressForm = new FormGroup(
      {
        address:new FormControl('',Validators.required),
        city:new FormControl('',Validators.required),
        state: new FormControl('',Validators.required),
        type: new FormControl('',Validators.required)
      }
    )
    this.check();
  }
  add(count:any){
    console.log(parseInt(count)+1);
  }
  check(){
    if(this.AddressForm.get('address')?.value == ''){
      console.log(this.AddressForm.value);
      this.newadd = true;
    }
  }
  addAddress(){
    this.userService.addAddress(this.AddressForm.value)
    .subscribe((result:any)=>{
      console.log(result);
    })
  }
  getAddress(){
    this.userService.getAddress()
    .subscribe((result:any)=>{
      this.userAddress = result.data;
      console.log("getAddress");
      console.log(result);
    })
  }
  editaddress(data:any){
    console.log(this.AddressForm.value);
    this.userService.updateAddress(data,this.AddressForm.value)
    .subscribe((result:any)=>{
      console.log(result);
    })  
  }
  change(data:any){
    this.checked=data['addressId'];
    this.radio = data['type'];
    console.log(data)
  }
  
  
  addtoCart(cartbook:any)
  {
    console.log("working");
    this.cartService.AddBooktoCart(cartbook)
    .subscribe((result:any)=>{
      console.log(result.message);
      this.GetCart();

    })
  }

  ReduceCount(cartbook : any)
  {
    console.log("cartbook");
    console.log(cartbook);
    let param = {
      userId: cartbook.userId,
       bookId: cartbook.bookId,
        cartId: cartbook.cartId
    }
    this.cartService.ReduceBookCountInCart(param)
    .subscribe((result:any)=>{
      console.log(result.message);
      this.GetCart();

    })
  }

  RemoveBook(cartbook :any)
  {
    console.log("cartbook");
    console.log(cartbook);
    this.cartService.RemoveBookFromCart(cartbook.cartId).subscribe((result:any)=>{
      console.log(result.message);
      this.GetCart();

    })
  }

  GetCart()
  {
    this.cartService.GetCart()
    .subscribe((result:any)=>{

      this.cartDetails = result.data;
      console.log(this.cartDetails);
    })

  }
  
  AddToOrders()
  {
    let order:any = [];
    this.cartDetails.forEach((element:any) => {
      let date= new Date();
      let currentDate=this.monthNames[date.getMonth()]+" "+ date.getDate();
      let orderData=
      {
        UserId: this.user.userId,
        BookId:element.bookId,
        AddressId:this.checked,
        OrderDate:currentDate,
        TotalCost:element.totalCost
      }
      order.push(orderData);
      this.RemoveBook(element);
    });
    this.orderService.AddToOrders(order).subscribe((result:any)=>{
      console.log(result.result);
      let temp = "";
      for(var res of result.result){
          temp+="#"+res+", ";
      }
      console.log(temp);
      this.data.changeMessage(temp);

    })
    this.route.navigateByUrl('/orderPlaced');
  }
 
}

