import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookRouting } from './book-routing';

import { PostABookComponent } from './post-a-book/post-a-book.component';
import { ViewABookComponent } from './view-a-book/view-a-book.component';
import { ListBooksComponent } from './list-books/list-books.component';
import { BooksSearchComponent } from './list-books/books-search/books-search.component';

@NgModule({
  imports: [
    BookRouting,
    CommonModule,
    FormsModule,
  ],
  declarations: [
    PostABookComponent,
    ViewABookComponent,
    ListBooksComponent,
    BooksSearchComponent
  ],
  providers: []
})

export class BookModule { }
