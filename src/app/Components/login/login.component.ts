import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/Service/userservice/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private userService:UserService,private snackBar:MatSnackBar) { }
  RegisterForm!:FormGroup
  hide = true;
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
          this.snackBar.open(result.message, '', { duration: 2500 });
          // if (result.status == true) {
          //   this.router.navigateByUrl('/login');
          // }
        },
        (error: HttpErrorResponse) => {
          this.snackBar.open(error.error.message, '', { duration: 2500 });
          // if (error.error.message == 'Email Already Exists! Please Login') {
          //   this.router.navigateByUrl('/login');
          // }
        }
      );
    }
  }
  EmailValidation()
  {
    if(this.LoginForm.get('email')?.hasError('required'))
    {
      return "Enter Email";
    }
    if(this.LoginForm.get('email')?.hasError('email'))
    {
      return "Email is not in proper format";
    }
    return null;
  }
  PasswordValidation()
  {
    if(this.LoginForm.get('password')?.hasError('required'))
    {
      return "Enter Password";
    }
    else if(this.LoginForm.get('password')?.hasError('pattern'))
    {
      return "Please enter a valid Password ";
    }
    else if(this.LoginForm.get('password')?.errors?.minlength)
    {
      return "Should have minimum 8 characters";
    }
    return null;

  }
}
