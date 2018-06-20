import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookRouting } from './book-routing';

import { ModifyComponent } from './modify/post-a-book.component';
import { ViewABookComponent } from './view/view-a-book.component';
import { ListBooksComponent } from './list/list-books.component';
import { BooksSearchComponent } from './list/search/books-search.component';
import { PaginationComponent } from './list/pagination/pagination.component';

@NgModule({
  imports: [
    BookRouting,
    CommonModule,
    FormsModule,
  ],
  declarations: [
    ModifyComponent,
    ViewABookComponent,
    ListBooksComponent,
    BooksSearchComponent,
    PaginationComponent
  ],
  providers: []
})

export class BookModule { }
