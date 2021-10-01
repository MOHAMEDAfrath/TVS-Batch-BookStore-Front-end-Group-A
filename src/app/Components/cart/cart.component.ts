import { Component, OnInit } from '@angular/core';
import { FormGroup ,FormControl,Validators} from '@angular/forms';
import { UserService } from 'src/app/Service/userservice/user.service';
import { CartService } from 'src/app/Service/cartService/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(private userService:UserService, private cartService:CartService) { }
  user = JSON.parse(localStorage.getItem('BookStoreUser')!);
  cart=[1];
  placeorder:any='order';
  addedit = false;
  edit = false;
  newadd = false;
  address = false;
  expand = false;
  cartDetails : any =[] ;
  checked: any;
  radio:string='';
  AddressForm!:FormGroup
  userAddress:any;
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

  GetCart()
  {
    this.cartService.GetCart()
    .subscribe((result:any)=>{

      this.cartDetails = result.data;
      console.log(this.cartDetails);
    })

  }

}
