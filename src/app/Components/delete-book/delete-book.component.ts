import { Component, Inject, OnInit, ɵɵtrustConstantResourceUrl } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BookdialogComponent } from '../bookdialog/bookdialog.component';

@Component({
  selector: 'app-delete-book',
  templateUrl: './delete-book.component.html',
  styleUrls: ['./delete-book.component.scss']
})
export class DeleteBookComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private dialogRef: MatDialogRef<BookdialogComponent>,) { }

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
  }
}
