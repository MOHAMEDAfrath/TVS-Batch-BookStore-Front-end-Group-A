import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/Service/book.service';
import { MatDialog } from '@angular/material/dialog';
import { BookdialogComponent } from '../bookdialog/bookdialog.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private book:BookService, public dialog : MatDialog) { }
  books:any=[];
  p:number= 1;
  ngOnInit(): void {
    this.getBooks();
  }
  getBooks(){
    this.book.getBooks()
    .subscribe((result:any)=>{
      this.books = result.data;
    })
  }
  openAddBook(){
    let dialogref = this.dialog.open(BookdialogComponent,{data:{edit:false}});
     dialogref.afterClosed().subscribe((result)=>{
       console.log(result);
      })
  }
}
