import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar  ,MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition, } from '@angular/material/snack-bar';
  import { UserService } from 'src/app/Service/userservice/user.service';
  import { HttpErrorResponse } from '@angular/common/http';
  import { Router} from '@angular/router';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  ForgotPasswordForm!: FormGroup;
  constructor(private userService:UserService,private snackBar:MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {
    this.ForgotPasswordForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    })
  }
  EmailValidation() {
    if (this.ForgotPasswordForm.get('email')?.hasError('required')) {
      return "Add Email";
    }
    else if (this.ForgotPasswordForm.get('email')?.hasError('email')) {
      return "Not a valid email";
    }
    return null;
  }

  ForgotPassword()
  {
  if(!this.ForgotPasswordForm.invalid) 
  {
    console.log("Register method");
    this.userService.ForgotPassword(this.ForgotPasswordForm.value)
  .subscribe(
    (status: any) => 
    {
      if(status.status == true)
      {
        this.StoreLocalStorage(status);
        this.snackBar.open(status.message,'',{duration:2000});
        this.router.navigateByUrl('/resetPassword');
      }
    },(error: HttpErrorResponse) => {
    console.log(error.error.message);
    this.snackBar.open(error.error.message,'',{duration:2000});
    if(error.error.message == "Email not Sent")
    {
      this.router.navigateByUrl('/login');
    }
  })
  }
  }


StoreLocalStorage(data: any)
{
  let lList=data.data;
  localStorage.setItem("OTP",JSON.stringify(lList)); 
}
  

}
