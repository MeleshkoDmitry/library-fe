import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookRouting } from './book-routing';

import { ModifyComponent } from './modify/modify-book-component';
import { ViewABookComponent } from './view/view-a-book.component';
import { ListBooksComponent } from './list/list-books.component';
import { BooksSearchComponent } from './list/search/books-search.component';
import { PaginationComponent } from '../common/pagination/pagination.component';
import { BookContainerComponent } from './list/list-book-container';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/reducers/book-reducer';
import {
  MatButtonModule, MatInputModule, MatIconModule, MatCardModule,
  MatSelectModule, MatOptionModule, MatTableModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ViewBookContainerComponent } from './view/view-book-container';
import { ModifyBookContainerComponent } from './modify/modify-book-container';

@NgModule({
  declarations: [
    BookContainerComponent,
    ViewBookContainerComponent,
    ModifyBookContainerComponent,
    ModifyComponent,
    ViewABookComponent,
    ListBooksComponent,
    BooksSearchComponent,
    PaginationComponent,
    ModifyComponent,
  ],
  imports: [
    StoreModule.forFeature('book', reducers),
    BookRouting,
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatSelectModule,
    MatOptionModule,
    MatTableModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    BrowserAnimationsModule
  ],
  entryComponents: [ModifyComponent],
  bootstrap: [ModifyComponent],
  providers: []
})

export class BookModule { }
