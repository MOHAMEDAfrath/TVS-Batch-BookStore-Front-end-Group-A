<<<<<<< HEAD
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
=======
import { async,ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
>>>>>>> c07648fe26f8465dc55ceff759424859bce75739
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BookDescriptionComponent } from './book-description.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('BookDescriptionComponent', () => {
  let component: BookDescriptionComponent;
  let fixture: ComponentFixture<BookDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientTestingModule,MatSnackBarModule,RouterTestingModule],
      declarations: [ BookDescriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

<<<<<<< HEAD
  // it('feedback form should be invalid', async(() => {
  //   component.FeedbackForm.controls['rate'].setValue('');
  //   //component.FeedbackForm.controls['comment'].setValue('');
  //   expect(component.FeedbackForm.valid).toBeFalsy();
  // }));
  // // it('feedback form should be invalid', async(() => {
  // //   component.FeedbackForm.controls['rate'].setValue('4');
  // //   component.FeedbackForm.controls['comment'].setValue('Good one1');
  // //   expect(component.FeedbackForm.valid).toBeTruthy();
  // // }));
=======
>>>>>>> c07648fe26f8465dc55ceff759424859bce75739
});
