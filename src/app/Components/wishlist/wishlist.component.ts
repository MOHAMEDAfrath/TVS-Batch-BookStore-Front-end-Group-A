import { Component, OnInit } from '@angular/core';
import { WishlistService } from 'src/app/Service/wishListService/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {

  constructor(private wishList:WishlistService) 
  { }
  WishList:any = [];
  ngOnInit(): void 
  {
    this.GetWishList();
  }
  GetWishList()
  {
    console.log("works")
    this.wishList.GetWishList()
    .subscribe((result:any)=>
    {
      console.log(result);
   this.WishList= result.data;
    })
    
  }
  RemoveFromWishList(list:any){
    console.log("works")
    this.wishList.RemoveFromWishList(list.myWishListId)
    .subscribe((result:any)=>{
      console.log(result);
      this.GetWishList();
    })
  }

}
