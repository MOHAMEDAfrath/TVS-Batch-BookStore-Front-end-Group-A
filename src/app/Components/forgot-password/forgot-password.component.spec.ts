import { async,ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ForgotPasswordComponent } from './forgot-password.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';

describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientTestingModule,MatSnackBarModule,RouterTestingModule],
      declarations: [ ForgotPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('forgotPassword form should be invalid', async(() => {
    component.ForgotPasswordForm.controls['email'].setValue('');
    expect(component.ForgotPasswordForm.valid).toBeFalsy();
  }));

  it('forgotPassword form should be valid', async(() => {
    component.ForgotPasswordForm.controls['email'].setValue('bollusaivijaykumar212@gmail.com');
    expect(component.ForgotPasswordForm.valid).toBeTruthy();
  }));
});
