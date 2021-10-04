import { Component, Input, OnInit } from '@angular/core';
import { BookService } from 'src/app/Service/book.service';
import { WishlistService } from 'src/app/Service/wishListService/wishlist.service';
import { CartService } from 'src/app/Service/cartService/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FeedBackService } from 'src/app/Service/FeedBackService/feed-back.service';
@Component({
  selector: 'app-book-description',
  templateUrl: './book-description.component.html',
  styleUrls: ['./book-description.component.scss']
})
export class BookDescriptionComponent implements OnInit {
  @Input() bookdetails!: any
  FeedbackForm!: FormGroup
  feedBackList :any = [];
  constructor(private book: BookService, private cartService: CartService, private wishlist: WishlistService, private snackBar: MatSnackBar,
    private feedBack: FeedBackService) { }
  Userrating = [{
    name: 'Aniket Chile',
    rating: 3,
    review: 'Good product. Even though the translation could have been better, Chanaky\'s neeti are thought provoking. Chanakya has written on many different topics and his writings are succinct.'
  }
    ,
  {
    name: 'Shweta Bodkar',
    rating: 4,
    review: 'Good product. Even though the translation could have been better, Chanaky\'s neeti are thought provoking. Chanakya has written on many different topics and his writings are succinct.'
  }
  ]

  ngOnInit(): void {

    this.FeedbackForm = new FormGroup({
      rate: new FormControl(''),
      comment: new FormControl('', Validators.required)
    })
    this.GetFeedBack();
  }
  Resize() {
    var textArea = document.getElementById("textarea")!
    textArea.style.height = 'auto';
    textArea.style.height = Math.min(500, textArea.scrollHeight) + 'px';
  }
  AddtoWishList() {
    this.wishlist.AddtoWishList(this.bookdetails)
      .subscribe((result: any) => {
        this.snackBar.open(result.message, '', { duration: 3000, verticalPosition: 'bottom', horizontalPosition: 'left' });
        console.log(result);
      }, error => {
        this.snackBar.open(`${error.error.message}`, '', { duration: 3000, verticalPosition: 'bottom', horizontalPosition: 'left' });
      })
  }


  AddBooktoCart() {
    if (this.bookdetails['bookQuantity'] > 0) {
      console.log("working");
      this.cartService.AddBooktoCart(this.bookdetails)
        .subscribe((result: any) => {
          console.log(result.message);
        })
    }
    else {
      this.snackBar.open("Out of Stock! Cant add to  cart", '', { duration: 3000, verticalPosition: 'bottom', horizontalPosition: 'left' });
    }
  }
  AddToFeedBack() {
    console.log("******************");
    console.log(this.FeedbackForm.value);
    if (this.FeedbackForm.valid) {
      this.feedBack.addcomment(this.FeedbackForm.value, this.bookdetails['bookId'])
        .subscribe((result: any) => {
        
          console.log(result);
          this.GetFeedBack();
        })
    }
  }
  GetFeedBack() {
    this.feedBack.getFeedBack(this.bookdetails['bookId'])
      .subscribe((result: any) => {
        console.log(result);
        this.feedBackList = result.data;
      })
  }
}
