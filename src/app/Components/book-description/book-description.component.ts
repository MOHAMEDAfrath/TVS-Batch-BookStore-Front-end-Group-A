import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { BookService } from 'src/app/Service/book.service';
import { WishlistService } from 'src/app/Service/wishListService/wishlist.service';
import { CartService } from 'src/app/Service/cartService/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FeedBackService } from 'src/app/Service/FeedBackService/feed-back.service';
import { elementEventFullName } from '@angular/compiler/src/view_compiler/view_compiler';
@Component({
  selector: 'app-book-description',
  templateUrl: './book-description.component.html',
  styleUrls: ['./book-description.component.scss']
})
export class BookDescriptionComponent implements OnInit {
  @Input() bookdetails!: any
  @Output("init") init: EventEmitter<any> = new EventEmitter();
  FeedbackForm!: FormGroup
  feedBackList: any = [];
  added = false;
  total = 0;
  cartDetail: any = [];
  constructor(private book: BookService, private cartService: CartService, private wishlist: WishlistService, private snackBar: MatSnackBar,
    private feedBack: FeedBackService) { }

  ngOnInit(): void {

    this.FeedbackForm = new FormGroup({
      rate: new FormControl(''),
      comment: new FormControl('', Validators.required)
    })
    this.GetFeedBack();
    this.GetCart();
    this.init.emit();
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
  GetCart() {
    this.cartService.GetCart()
      .subscribe((result: any) => {

        this.cartDetail = result.data;
        this.added = this.cartDetail.some((element: any) => element.bookId == this.bookdetails.bookId)
        console.log(this.cartDetail);
      })

  }
  AddBooktoCart() {
    if (this.bookdetails['bookQuantity'] > 0) {
      console.log("working");
      this.cartService.AddBooktoCart(this.bookdetails)
        .subscribe((result: any) => {
          console.log(result.message);
          this.snackBar.open(result.message, '', { duration: 3000, verticalPosition: 'bottom', horizontalPosition: 'left' });
          this.ngOnInit();
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
          this.FeedbackForm.reset();
          this.ngOnInit();
        })
    }
  }
  GetFeedBack() {
    this.feedBack.getFeedBack(this.bookdetails['bookId'])
      .subscribe((result: any) => {
        console.log(result);
        this.feedBackList = result.data;
        if (this.feedBackList == 0) {
          this.total = 0;
        }
        this.feedBackList.forEach((element: any) => {
          this.total += element.rating;
        });
      })
  }
}
