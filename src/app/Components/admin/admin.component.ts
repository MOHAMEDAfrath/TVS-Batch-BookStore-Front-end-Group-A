import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/Service/book.service';
import { MatDialog } from '@angular/material/dialog';
import { BookdialogComponent } from '../bookdialog/bookdialog.component';
import { Router } from '@angular/router';
import { DeleteBookComponent } from '../delete-book/delete-book.component';

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
    this.checklocal();
  }
  getBooks(){
    this.book.getBooks()
    .subscribe((result:any)=>{
      this.books = result.data;
    })
  }
  checklocal(){
   var BookStoreAdmin =  JSON.parse(localStorage.getItem("BookStoreAdmin")!); 
   if(BookStoreAdmin == null){
     this.route.navigateByUrl('/home');
   }
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
  openDeleteBook(book:any){
    let dialogref = this.dialog.open(DeleteBookComponent,{data:{data:book}});
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
