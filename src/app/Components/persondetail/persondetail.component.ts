import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-persondetail',
  templateUrl: './persondetail.component.html',
  styleUrls: ['./persondetail.component.scss']
})
export class PersondetailComponent implements OnInit {
  user = JSON.parse(localStorage.getItem('BookStoreUser')!);
  constructor() { }
  edit = false;
  addedit = false;
  ngOnInit(): void {

  }

}
