import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators } from '@angular/forms';
import { MatSnackBar  ,MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition, } from '@angular/material/snack-bar';
import { UserService } from 'src/app/Service/userservice/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private userService:UserService,private snackBar:MatSnackBar) { }
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
}
