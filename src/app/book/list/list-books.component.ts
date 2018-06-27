import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { BookService } from '../book.service';
import { Router } from '@angular/router';
import { Book, BookFilter } from '../book';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-list-books',
  templateUrl: './list-books.component.html',
  styleUrls: ['./list-books.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ListBooksComponent {
  @Input() books: Book[];
  @Input() totalRecords: number;

  bookFilter: BookFilter;

  constructor(
    private bookService: BookService,
    private router: Router,
    private store: Store<any>) { }

  viewBook(_id: string): void {
    this.store.dispatch({ type: 'VIEW_BOOK', payload: _id });
    this.router.navigate(['/books/viewbook/', _id]);
  }

  editBook(_id: string): void {
    this.store.dispatch({ type: 'EDIT_BOOK', payload: _id });
    this.router.navigate(['/books/editbook/', _id]);
  }

  deleteBook(_id: string): void {
    this.bookService.deleteBook(_id)
      .subscribe(() => {
      });
  }

  // editBook(_id: string): void {
  //   this.bookService.viewBook(_id).subscribe((result) => {
  //     this.store.dispatch({ type: 'EDIT_BOOK', book: result });
  //     this.router.navigate(['/books/editbook/', _id]);
  //   });
  // }

  onSearch(): void {
    /*  this.bookState = this.store.subscribe((result) => {
       result.pagination.currentState = 1;
       this.bookFilter.title = result.searchBooks.title;
       this.bookFilter.author = result.searchBooks.author;
     }); */
  }
}
