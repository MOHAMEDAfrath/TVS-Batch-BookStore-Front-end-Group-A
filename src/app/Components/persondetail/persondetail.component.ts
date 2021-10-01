import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/Service/userservice/user.service';

@Component({
  selector: 'app-persondetail',
  templateUrl: './persondetail.component.html',
  styleUrls: ['./persondetail.component.scss']
})
export class PersondetailComponent implements OnInit {
  user = JSON.parse(localStorage.getItem('BookStoreUser')!);
  Password= atob(this.user.password);

  constructor(private userService:UserService) { }
  edit = false;
  addedit = false;
  newadd = false;
  address = false;
  expand = false;
  checked: any;
  radio:string='';
  AddressForm!:FormGroup
  PersonForm!:FormGroup
  userAddress:any;
  ngOnInit(): void {
    this.getAddress();
    console.log(this.user);
    this.AddressForm = new FormGroup(
      {
        address:new FormControl('',Validators.required),
        city:new FormControl('',Validators.required),
        state: new FormControl('',Validators.required),
        type: new FormControl('',Validators.required)
      }
    ),
    this.PersonForm=new FormGroup(
      {
        fullname:new FormControl('',Validators.required),
        email:new FormControl('',Validators.required),
        password: new FormControl('',Validators.required),
        mobile: new FormControl('',Validators.required)
      }
    )
    this.check();
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
  EditPersonDetail()
  {
    console.log(this.PersonForm.value);
    this.userService.EditPersonDetail(this.PersonForm.value)
    .subscribe((result:any)=>{
      console.log(result);
      let obj={
        emailId:this.PersonForm.value.email,
        fullName:this.PersonForm.value.fullname,
        mobileNumber:this.PersonForm.value.mobile,
        password:btoa(this.PersonForm.value.password),
        userId:this.user.userId
      }
      localStorage.setItem('BookStoreUser', JSON.stringify(obj));
    })  
  }
}
