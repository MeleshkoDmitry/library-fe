import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { BookService } from '../book.service';
import { Book } from '../book';
import { Router } from '@angular/router';
import { PaginationComponent } from './pagination/pagination.component';
import { BookFilter } from '../book.filter';

@Component({
  selector: 'app-list-books',
  templateUrl: './list-books.component.html',
  styleUrls: ['./list-books.component.css']
})

export class ListBooksComponent implements OnInit {
  books: Book;
  bookFilter: BookFilter;

  constructor(private bookService: BookService, private router: Router) {
    this.bookFilter = new BookFilter();
    this.bookFilter.page = 1;
    this.bookFilter.pageSize = 5;
  }

  ngOnInit() {
    this.loadBooks();
  }

  loadBooks() {
    this.bookService.viewListBooks(this.bookFilter)
      .subscribe((result) => {
        this.books = result[0];
        this.bookFilter.totalPages = result[1];
      });
  }

  viewBook(_id: string) {
    this.router.navigate([
      '/books/viewbook/', _id]);
  }

  deleteBook(_id: string) {
    this.bookService.deleteBook(_id)
      .subscribe(() => {
        this.loadBooks();
      });
  }

  editBook(_id: string) {
    this.router.navigate(['/books/editbook/', _id]);
  }

  searchBooks(event) {
    this.books = event;
  }

  pageChange(event: BookFilter) {
    this.bookFilter.page = event.page;
    this.bookFilter.pageSize = event.pageSize;
    this.loadBooks();
  }

  onSearch({ author, title }) {
    this.bookFilter.author = author;
    this.bookFilter.title = title;
    this.loadBooks();
  }
}
