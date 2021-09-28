import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  ResetPasswordForm!: FormGroup;
  hide = false;
  constructor() { }

  ngOnInit(): void {
    this.ResetPasswordForm = new FormGroup({
      password: new FormControl('',[Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}')]),
      confirmPassword: new FormControl('',[Validators.required])
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
}
