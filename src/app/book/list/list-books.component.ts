import { Component, OnInit, OnDestroy } from '@angular/core';
import { BookService } from '../book.service';
import { Router } from '@angular/router';
import { Book, BookFilter } from '../book';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-list-books',
  templateUrl: './list-books.component.html',
  styleUrls: ['./list-books.component.css']
})

export class ListBooksComponent implements OnInit, OnDestroy {
  books: Book[];
  bookFilter: BookFilter;
  bookState: any;
  totalRecords: number;

  constructor(private bookService: BookService, private router: Router, private store: Store<any>) {
    this.bookFilter = new BookFilter();
    this.bookFilter.page = 1;
    this.bookFilter.pageSize = 5;
    this.bookFilter.sort = '-1';
  }

  ngOnInit() {
    this.loadBooks();
  }

  loadBooks(): void {
    this.bookService.viewListBooks(this.bookFilter)
      .subscribe((result) => {
        this.store.dispatch({ type: 'VIEW_LIST_BOOKS', listBooks: result });
      });
    this.bookState = this.store.subscribe((result) => {
      this.books = result.listBooks.books;
      this.totalRecords = result.listBooks.totalRecords;
    });
  }

  viewBook(_id: string): void {
    this.bookService.viewBook(_id).subscribe((result) => {
      this.store.dispatch({ type: 'VIEW_BOOK', book: result });
      this.router.navigate(['/books/viewbook/', _id]);
    });
  }

  deleteBook(_id: string): void {
    this.bookService.deleteBook(_id)
      .subscribe(() => {
        this.loadBooks();
      });
  }

  editBook(_id: string): void {
    this.bookService.viewBook(_id).subscribe((result) => {
      this.store.dispatch({ type: 'EDIT_BOOK', book: result });
      this.router.navigate(['/books/editbook/', _id]);
    });
  }

  pageChange(event: any) {
    this.bookFilter.page = event.page;
    this.bookFilter.pageSize = event.pageSize;
    this.loadBooks();
  }

  onSearch(): void {
    this.bookState = this.store.subscribe((result) => {
      result.pagination.currentState = 1;
      this.bookFilter.title = result.searchBooks.title;
      this.bookFilter.author = result.searchBooks.author;
      this.loadBooks();
    });
    this.unsubscribe();
  }

  unsubscribe() {
    this.bookState.unsubscribe();
  }

  ngOnDestroy() {
    this.unsubscribe();
  }
}
