import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-book-description',
  templateUrl: './book-description.component.html',
  styleUrls: ['./book-description.component.scss']
})
export class BookDescriptionComponent implements OnInit {

  constructor() { }
  Userrating=[{name:'Ash',
               rating:3,
              review:'This is content'},
            {
              name:'Ash',
               rating:3,
              review:'This is content'}
            ]

  ngOnInit(): void {
  }
  Resize(){
    var textArea = document.getElementById("textarea")!      
    textArea.style.height = 'auto';
    textArea.style.width='auto';
    textArea.style.height = Math.min(500,textArea.scrollHeight) + 'px';
    textArea.style.width=textArea.scrollWidth+'px';
  }
}
