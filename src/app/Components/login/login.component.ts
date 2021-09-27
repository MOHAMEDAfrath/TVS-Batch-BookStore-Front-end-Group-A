import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor() { }
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

}
