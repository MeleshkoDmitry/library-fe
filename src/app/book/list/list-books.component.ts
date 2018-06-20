import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { BookService } from '../book.service';
import { Book } from '../book';
import { Router } from '@angular/router';
import { PaginationComponent } from './pagination/pagination.component';

@Component({
  selector: 'app-list-books',
  templateUrl: './list-books.component.html',
  styleUrls: ['./list-books.component.css']
})

export class ListBooksComponent implements OnInit {
  books: Book;
  page: number;
  perPage: number;
  totalPages: number;

  @ViewChild(PaginationComponent)
  pagination: PaginationComponent;

  constructor(private bookService: BookService, private router: Router) { }

  ngOnInit() {
    this.page = 1;
    this.perPage = 5;
    this.loadBooks();
  }

  loadBooks() {
    this.bookService.viewListBooks(this.books, this.page.toString(), this.perPage.toString())
      .subscribe((result) => {
        this.books = result[0];
        this.totalPages = result[1];
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
    this.pagination.resetPage();
    this.books = event;
  }

  pagesEvent(event) {
    this.page = event;
    this.loadBooks();
  }

  listPerPage(event) {
    this.perPage = event;
  }
}
