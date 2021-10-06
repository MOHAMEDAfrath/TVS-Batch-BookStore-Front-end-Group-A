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
  title:any;
  desc:any;
  price:any;
  rating:any;
  bookquant:any;
  author:any;
  bigLink:any;
  imageLink:any;
  ngOnInit(): void {
    this.AddBookForm = new FormGroup({
      Title : new FormControl('',[Validators.required,Validators.minLength(3)]),
      Author:new FormControl('',[Validators.required,Validators.minLength(3)]),
      Price: new FormControl('',[Validators.required,Validators.pattern('^[0-9]+')]),
      Rating : new FormControl('',[Validators.required]),
      textarea:new FormControl('',[Validators.required,Validators.minLength(10)]),
      bookquantity: new FormControl('',[Validators.required,Validators.pattern('^[0-9]+')])
    })
    if(this.data.edit){
        this.setValues();
    }
  }
  Resize(){
    var textArea = document.getElementById("textarea")!      
    textArea.style.height = 'auto';
    textArea.style.height = Math.min(500,textArea.scrollHeight) + 'px';
  }
  OnselectFile(event: any,image:Number)
{
  this.setImage(event,image);
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
setValues(){
  this.title = this.data.data.title,
  this.desc = this.data.data.bookDetail,
  this.author = this.data.data.authorName,
  this.price = this.data.data.price,
  this.rating = this.data.data.rating,
  this.bookquant = this.data.data.bookQuantity
}
updateBook(){
  if(!this.AddBookForm.invalid){
    let bookDetail= new FormData();
    bookDetail.append('BookId',this.data.data.bookId);
    bookDetail.append('Title',this.AddBookForm.value.Title);
    bookDetail.append('AuthorName',this.AddBookForm.value.Author);
    bookDetail.append('Price',this.AddBookForm.value.Price);
    bookDetail.append('Rating',this.AddBookForm.value.Rating);
    bookDetail.append('BookDetail',this.AddBookForm.value.textarea);
    bookDetail.append('BookQuantity',this.AddBookForm.value.bookquantity);
    bookDetail.append('BookImage',this.Bookfile);
    bookDetail.append('BigImage',this.BigImageFile);
    this.adminservice.updateBook(bookDetail)
    .subscribe((result:any)=>{
      console.log(result);
      this.snackBar.open(result.message, '', { duration: 2500,panelClass:['black-snackbar']});
      this.dialogRef.close();
    },
    (error: HttpErrorResponse) => {
      this.snackBar.open(error.error.message, '', { duration: 2500 });
    })
  }
}
AddBook()
{
 if(!this.AddBookForm.invalid && this.BigImageFile != null && this.Bookfile != null)
 {
    let bookDetail= new FormData();
    bookDetail.append('Title',this.AddBookForm.value.Title);
    bookDetail.append('AuthorName',"by "+this.AddBookForm.value.Author);
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
      this.dialogRef.close();
    },
    (error: HttpErrorResponse) => {
      this.snackBar.open(error.error.message, '', { duration: 2500 });
    }
  );
 }
}
setImage(event:any,image:any){
  if(event.target.files){
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload =(event:any)=>{
      if(image == 1){
      this.imageLink = event.target.result;
      }else if(image == 2){
        this.bigLink = event.target.result;
      }
    }
  }
}
}
