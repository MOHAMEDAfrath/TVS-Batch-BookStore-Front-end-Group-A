import { Component, OnInit ,Inject} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-bookdialog',
  templateUrl: './bookdialog.component.html',
  styleUrls: ['./bookdialog.component.scss']
})
export class BookdialogComponent implements OnInit {

  constructor( @Inject(MAT_DIALOG_DATA) public data: any,private dialogRef: MatDialogRef<BookdialogComponent>) { }

  ngOnInit(): void {
  }

}
