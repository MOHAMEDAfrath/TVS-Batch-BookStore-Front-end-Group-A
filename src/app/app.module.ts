import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ForgotPasswordComponent } from './Components/forgot-password/forgot-password.component';
import {MatCardModule} from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './Components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import {HomeComponent} from './Components/home/home.component'
import { ResetPasswordComponent } from './Components/reset-password/reset-password.component';
import {MatMenuModule} from '@angular/material/menu';
import { WishlistComponent } from './Components/wishlist/wishlist.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { BookDescriptionComponent } from './Components/book-description/book-description.component';
import { PersondetailComponent } from './Components/persondetail/persondetail.component';
import { CartComponent } from './Components/cart/cart.component';
import { OrderComponent } from './Components/order/order.component';
import { OrderPlacedComponent } from './Components/order-placed/order-placed.component';
import { NgxStarRatingModule } from 'ngx-star-rating';
import {MatBadgeModule} from '@angular/material/badge';
import { AdminComponent } from './Components/admin/admin.component';
import { BookdialogComponent } from './Components/bookdialog/bookdialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { DeleteBookComponent } from './Components/delete-book/delete-book.component';

@NgModule({
  declarations: [
    AppComponent,
    ForgotPasswordComponent,
    LoginComponent,
    HomeComponent,
    ResetPasswordComponent,
    WishlistComponent,
    BookDescriptionComponent,
    PersondetailComponent,
    CartComponent,
    OrderComponent,
    OrderPlacedComponent,
    AdminComponent,
    BookdialogComponent,
    DeleteBookComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatCardModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    MatSnackBarModule,
    HttpClientModule,
    MatMenuModule,
    NgxPaginationModule,
    NgxStarRatingModule,
    MatBadgeModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents:[BookdialogComponent]
})
export class AppModule { }
