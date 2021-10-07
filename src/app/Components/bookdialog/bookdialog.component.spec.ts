import { async,ComponentFixture, TestBed , inject , tick, fakeAsync} from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BookdialogComponent } from './bookdialog.component';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { AdminService } from 'src/app/Service/admin/admin.service';

describe('BookdialogComponent', () => {
  let component: BookdialogComponent;
  let fixture: ComponentFixture<BookdialogComponent>;
  let el: HTMLElement;
  // const response:any;
  let adminService:any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientTestingModule,MatDialogModule,MatSnackBarModule],
      declarations: [ BookdialogComponent ],
      providers:[{provide:MAT_DIALOG_DATA,useValue:{}},{provide:MatDialogRef,useValue:{}}, AdminService]
    })
    .compileComponents();
  });

  beforeEach(inject([AdminService], (s:any) => {
    adminService=s;
    fixture = TestBed.createComponent(BookdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Book form should be invalid', async(() => {
    component.AddBookForm.controls['Title'].setValue('');
    component.AddBookForm.controls['Author'].setValue('');
    component.AddBookForm.controls['Price'].setValue('');
    component.AddBookForm.controls['Rating'].setValue('');
    component.AddBookForm.controls['textarea'].setValue('');
    component.AddBookForm.controls['bookquantity'].setValue('');
    expect(component.AddBookForm.valid).toBeFalsy();
  }));
  it('Book form should be valid', async(() => {
    component.AddBookForm.controls['Title'].setValue('Da Vinci Code');
    component.AddBookForm.controls['Author'].setValue('Dan Brown');
    component.AddBookForm.controls['Price'].setValue('500');
    component.AddBookForm.controls['Rating'].setValue('4');
    component.AddBookForm.controls['textarea'].setValue('In the code below, we have a MyApp module with a flag property and a setFlag() function exposed.  We also have an instance of that module called myApp in the test.  To spy on the myApp.setFlag() function, we use');
    component.AddBookForm.controls['bookquantity'].setValue('20');
    expect(component.AddBookForm.valid).toBeTruthy();
  }));
  it('Add Book function is called', async(() => {
    component.AddBookForm.controls['Title'].setValue('Da Vinci Code');
    component.AddBookForm.controls['Author'].setValue('Dan Brown');
    component.AddBookForm.controls['Price'].setValue('500');
    component.AddBookForm.controls['Rating'].setValue('4');
    component.AddBookForm.controls['textarea'].setValue('In the code below, we have a MyApp module with a flag property and a setFlag() function exposed.  We also have an instance of that module called myApp in the test.  To spy on the myApp.setFlag() function, we use');
    component.AddBookForm.controls['bookquantity'].setValue('20');
    component.AddBook();
    expect(component.addbookforTest).toBe(true);
  }));

});
