import { Component, Input, OnInit } from '@angular/core';
import { BookService } from 'src/app/Service/book.service';
import { CartService } from 'src/app/Service/cartService/cart.service';
@Component({
  selector: 'app-book-description',
  templateUrl: './book-description.component.html',
  styleUrls: ['./book-description.component.scss']
})
export class BookDescriptionComponent implements OnInit {
  @Input() bookdetails!:any
  constructor(private book:BookService, private cartService : CartService) { }
  Userrating=[{name:'Aniket Chile',
               rating:3,
               review:'Good product. Even though the translation could have been better, Chanaky\'s neeti are thought provoking. Chanakya has written on many different topics and his writings are succinct.'}
               ,
            {
              name:'Shweta Bodkar',
               rating:4,
              review:'Good product. Even though the translation could have been better, Chanaky\'s neeti are thought provoking. Chanakya has written on many different topics and his writings are succinct.'}
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
  AddtoWishList()
  {
    this.book.AddtoWishList(this.bookdetails)
    .subscribe((result:any)=>{

      console.log(result.message);
    })
  }

    
AddBooktoCart()
{
  console.log("working");
  this.cartService.AddBooktoCart(this.bookdetails)
  .subscribe((result:any)=>{
    console.log(result.message);
  })
}

}
