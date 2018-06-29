import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookRouting } from './book-routing';

import { ModifyComponent } from './modify/post-a-book.component';
import { ViewABookComponent } from './view/view-a-book.component';
import { ListBooksComponent } from './list/list-books.component';
import { BooksSearchComponent } from './list/search/books-search.component';
import { PaginationComponent } from '../common/pagination/pagination.component';
import { BookContainerComponent } from './book.container';
import { StoreModule } from '@ngrx/store';
import { reducers } from '../store/reducers/book.reducer';
import { BooksEffects } from '../store/effects/book.effect';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [
    BookContainerComponent,
    ModifyComponent,
    ViewABookComponent,
    ListBooksComponent,
    BooksSearchComponent,
    PaginationComponent
  ],
  imports: [
    StoreModule.forFeature('books', reducers),
    EffectsModule.forRoot([BooksEffects]),
    BookRouting,
    CommonModule,
    FormsModule,
  ],
  providers: []
})

export class BookModule { }
