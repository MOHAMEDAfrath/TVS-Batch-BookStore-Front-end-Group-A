import { Component, OnInit ,Inject} from '@angular/core';
import { FormGroup , Validators , FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { AdminService } from 'src/app/Service/admin/admin.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar  ,MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition, } from '@angular/material/snack-bar';
import { BookDescriptionComponent } from '../book-description/book-description.component';
@Component({
  selector: 'app-bookdialog',
  templateUrl: './bookdialog.component.html',
  styleUrls: ['./bookdialog.component.scss']
})
export class BookdialogComponent implements OnInit {

  constructor( @Inject(MAT_DIALOG_DATA) public data: any,private dialogRef: MatDialogRef<BookdialogComponent>,
  private adminservice: AdminService, private snackBar:MatSnackBar) { }
  Bookfile:any=null;
  BigImageFile:any=null;
  AddBookForm!:FormGroup;
  ngOnInit(): void {
    this.AddBookForm = new FormGroup({
      Title : new FormControl('',[Validators.required,Validators.minLength(3)]),
      Author:new FormControl('',[Validators.required,Validators.minLength(3)]),
      Price: new FormControl('',[Validators.required,Validators.pattern('^[0-9]+')]),
      Rating : new FormControl('',[Validators.required]),
      textarea:new FormControl('',[Validators.required,Validators.minLength(10)]),
      bookquantity: new FormControl('',[Validators.required,Validators.pattern('^[0-9]+')])
    })
  }
  Resize(){
    var textArea = document.getElementById("textarea")!      
    textArea.style.height = 'auto';
    textArea.style.height = Math.min(500,textArea.scrollHeight) + 'px';
  }
  OnselectFile(event: any,image:Number)
{
  var files: File = event.target.files.item(0);
   const formData = files;
    // formData.append('formFile', files,files.name);
    console.log(formData);
    if(image == 1)
    {
      this.Bookfile=formData;
    }
    else{
      this.BigImageFile=formData;
    }
}
AddBook()
{
 if(!this.AddBookForm.invalid && this.BigImageFile != null && this.Bookfile != null)
 {
    let bookDetail= new FormData();
    bookDetail.append('Title',this.AddBookForm.value.Title);
    bookDetail.append('AuthorName',this.AddBookForm.value.Author);
    bookDetail.append('Price',this.AddBookForm.value.Price);
    bookDetail.append('Rating',this.AddBookForm.value.Rating);
    bookDetail.append('BookDetail',this.AddBookForm.value.textarea);
    bookDetail.append('BookQuantity',this.AddBookForm.value.bookquantity);
    bookDetail.append('BookImage',this.Bookfile);
    bookDetail.append('BigImage',this.BigImageFile);
  console.log(bookDetail);
  this.adminservice.AddBook(bookDetail).subscribe(
    (result: any) => {
      console.log(result);
      this.snackBar.open(result.message, '', { duration: 2500,panelClass:['black-snackbar']});
    },
    (error: HttpErrorResponse) => {
      this.snackBar.open(error.error.message, '', { duration: 2500 });
    }
  );
 }
}
}
