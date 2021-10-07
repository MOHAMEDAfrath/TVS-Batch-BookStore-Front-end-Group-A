import { async,ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientTestingModule,RouterTestingModule,MatSnackBarModule],
      declarations: [ LoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('login form should be invalid', async(() => {
    component.LoginForm.controls['email'].setValue('');
    component.LoginForm.controls['password'].setValue('');
    expect(component.LoginForm.valid).toBeFalsy();
  }));

  it('login form should be valid', async(() => {
    component.LoginForm.controls['email'].setValue('afrathismath@gmail.com');
    component.LoginForm.controls['password'].setValue('Afrath@123');
    expect(component.LoginForm.valid).toBeTruthy();
  }));

  it('register form should be invalid', async(() => {
    component.RegisterForm.controls['FullName'].setValue('');
    component.RegisterForm.controls['Email'].setValue('');
    component.RegisterForm.controls['Password'].setValue('');
    component.RegisterForm.controls['Mobile'].setValue('');
    expect(component.RegisterForm.valid).toBeFalsy();
  }));

  it('register form should be valid', async(() => {
    component.RegisterForm.controls['FullName'].setValue('Mohamed');
    component.RegisterForm.controls['Email'].setValue('afrathismath@gmail.com');
    component.RegisterForm.controls['Password'].setValue('Afrath@123');
    component.RegisterForm.controls['Mobile'].setValue('9885745635');
    expect(component.RegisterForm.valid).toBeTruthy();
  }));

});