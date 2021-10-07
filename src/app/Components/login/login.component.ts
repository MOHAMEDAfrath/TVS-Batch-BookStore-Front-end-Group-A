import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators } from '@angular/forms';
import { MatSnackBar  ,MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition, } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Service/userservice/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private userService:UserService,private snackBar:MatSnackBar,
    private route: Router) { }
  RegisterForm!:FormGroup
  hide = false;
  signup = false;
  LoginForm!: FormGroup;
  ngOnInit(): void {
    this.LoginForm= new FormGroup({
      email: new FormControl('',[Validators.email,Validators.required]),
      password : new FormControl('',[Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[#@$!%*?&])[A-Za-z\d@#$!%*?&].{4,}'),Validators.minLength(8)])
    }),
    this.RegisterForm = new FormGroup({
      FullName : new FormControl('',[Validators.required,Validators.minLength(3)]),
      Email:new FormControl('',[Validators.required,Validators.email]),
      Password: new FormControl('',[Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}')]),
      Mobile : new FormControl('',[Validators.required,Validators.minLength(10),Validators.pattern('^[0-9]{10}$')])
    })
  }
  Register() {
    if (!this.RegisterForm.invalid) {
      console.log(this.RegisterForm.value)
      this.userService.Register(this.RegisterForm.value).subscribe(
        (result: any) => {
          console.log(result);
          this.snackBar.open(result.message, '', { duration: 2500,panelClass:['black-snackbar']});
           if (result.status == true) {
             this.signup=false;
             this.RegisterForm.reset();
          }
        },
        (error: HttpErrorResponse) => {
          this.snackBar.open(error.error.message, '', { duration: 2500 });
          if (error.error.message == 'Email Already Exists! Please Login') {
            this.signup=false;
          }
        }
      );
    }
  }
  Login(){
    if(!this.LoginForm.invalid){
      console.log(this.LoginForm.value);
      this.userService.Login(this.LoginForm.value).subscribe((result:any)=>{
        if(result.status==true)
        {
          if(result.data.mobileNumber==null)
          {
            this.AdminLocalStorage(result.data,result.token);
            this.route.navigateByUrl('/admin/home');
          }
          else
          {
            this.LocalStorage(result.data,result.token);
            this.route.navigateByUrl('/home');
          }
          this.snackBar.open(result.message,'',{duration:2000,panelClass:['black-snackbar']});
          this.LoginForm.reset();
      }

      },
      (error: HttpErrorResponse) => {
        this.snackBar.open(error.error.message, '', { duration: 2500 });
      })
    }
  }
  LocalStorage(data: any,token:any)
   {
    var user = localStorage.getItem('BookStoreUser');
    if (user != null) 
    {
      localStorage.removeItem('BookStoreUser');
    }
    let obj:any=
    {
      fullName: data.fullName,
      emailId: data.emailId,
      password: data.password,
      mobileNumber:data.mobileNumber,
      userId:data.userId,
      token:token
    }
    user =obj;
    console.log(obj);
    localStorage.setItem('BookStoreUser', JSON.stringify(user));

  }

  AdminLocalStorage(data: any,token:any)
  {
   var user = localStorage.getItem('BookStoreAdmin');
   if (user != null) 
   {
     localStorage.removeItem('BookStoreAdmin');
   }
   let obj:any=
   {
     EmailId: data.emailId,
     Password: data.password,
     AdminId:data.userId,
     token:token
   }
   user =obj;
   localStorage.setItem('BookStoreAdmin', JSON.stringify(user));

 }

}
