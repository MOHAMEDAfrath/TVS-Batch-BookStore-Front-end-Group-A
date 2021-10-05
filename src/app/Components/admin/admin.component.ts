import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/Service/book.service';
import { MatDialog } from '@angular/material/dialog';
import { BookdialogComponent } from '../bookdialog/bookdialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private book:BookService, public dialog : MatDialog, private route : Router) { }
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
  openAddBook(edit:boolean){
    let dialogref = this.dialog.open(BookdialogComponent,{data:{edit:edit}});
     dialogref.afterClosed().subscribe((result)=>{
       this.ngOnInit();
      })
  }
  openEditBook(book:any,edit:boolean){
    let dialogref = this.dialog.open(BookdialogComponent,{data:{data:book,edit:edit}});
     dialogref.afterClosed().subscribe((result)=>{
       this.ngOnInit();
      })
  }

  Logout()
  {
      localStorage.removeItem("BookStoreAdmin");
      this.route.navigateByUrl('/home');
  }

}
