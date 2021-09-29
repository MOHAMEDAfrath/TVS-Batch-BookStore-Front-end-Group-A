import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/Service/userservice/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router} from '@angular/router';
import { MatSnackBar  ,MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition, } from '@angular/material/snack-bar';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  ResetPasswordForm!: FormGroup;
  hide = false;

  otp=(JSON.parse(localStorage.getItem("OTP")!).otp); 
  constructor(private userService:UserService,private snackBar:MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {
    this.ResetPasswordForm = new FormGroup({
      password: new FormControl('',[Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}')]),
      confirmPassword: new FormControl('',[Validators.required]),
      OTP: new FormControl('',[Validators.required])
    })
  }
  PasswordValidation()
  {
    if(this.ResetPasswordForm.get('password')?.hasError('required'))
    {
      return "Enter Password";
    }
    else if(this.ResetPasswordForm.get('password')?.hasError('pattern'))
    {
      return "Please enter a valid Password ";
    }
    else if(this.ResetPasswordForm.get('password')?.errors?.minlength)
    {
      return "Should have minimum 8 characters";
    }
    return null;

  }
  ResetPassword()
{
  console.log(this.otp);
  console.log(this.ResetPasswordForm.value.OTP);
if(!this.ResetPasswordForm.invalid) 
{
  console.log("Register method");
if(this.ResetPasswordForm.value.OTP == this.otp)
{
  this.userService.ResetPassword(this.ResetPasswordForm.value)
  .subscribe(
    (status: any) => 
    {
      if(status.status == true)
      {
        this.snackBar.open(status.message,'',{duration:2000});
        localStorage.removeItem('OTP');
        this.router.navigateByUrl('/login');
      }
    },(error: HttpErrorResponse) => {
    console.log(error.error.message);
    this.snackBar.open(error.error.message,'',{duration:2000});
    if(error.error.message == "Reset Unsuccessfull!")
    {
      this.router.navigateByUrl('/login');
    }
  })
}
else{
  this.snackBar.open("Incorrect OTP",'',{duration:2000});
  this.router.navigateByUrl('/login');
}
}
}
}
