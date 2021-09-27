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
  ngOnInit(): void {
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

}
