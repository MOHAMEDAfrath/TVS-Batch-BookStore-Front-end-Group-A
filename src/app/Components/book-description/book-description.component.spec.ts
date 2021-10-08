import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BookDescriptionComponent } from './book-description.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('BookDescriptionComponent', () => {
  let component: BookDescriptionComponent;
  let fixture: ComponentFixture<BookDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientTestingModule,MatSnackBarModule],
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
  it('FeedBack form should be invalid', async(() => {
    component.FeedbackForm.controls['bookId'].setValue('null');
    component.FeedbackForm.controls['rate'].setValue('');
    component.FeedbackForm.controls['comment'].setValue('');
    expect(component.FeedbackForm.valid).toBeFalsy();
  }));
});
