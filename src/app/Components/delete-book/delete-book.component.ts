import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit, ɵɵtrustConstantResourceUrl } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from 'src/app/Service/admin/admin.service';
import { BookdialogComponent } from '../bookdialog/bookdialog.component';

@Component({
  selector: 'app-delete-book',
  templateUrl: './delete-book.component.html',
  styleUrls: ['./delete-book.component.scss']
})
export class DeleteBookComponent implements OnInit {


  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private dialogRef: MatDialogRef<BookdialogComponent>,
  public adminService:AdminService,public snackBar:MatSnackBar) { }

  Books:any;
  ngOnInit(): void 
  {
    this.Books=this.data.data;
    console.log(this.Books.title);
  }
  DeleteBook()
  {
    console.log("data");
    console.log(this.data);
    this.adminService.deleteBook(this.Books.bookId).subscribe((result:any)=>{
      this.snackBar.open(`Book Removed Successfully`, '', { duration: 3000, horizontalPosition: 'left', verticalPosition: 'bottom' });
    },
    (error: HttpErrorResponse) => {
      this.snackBar.open(error.error.message, '', { duration: 3000, horizontalPosition: 'left', verticalPosition: 'bottom'  });
    }
  );
 }
}
