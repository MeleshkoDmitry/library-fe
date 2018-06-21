import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { Router } from '@angular/router';
import { Book, BookFilter } from '../book';

@Component({
  selector: 'app-list-books',
  templateUrl: './list-books.component.html',
  styleUrls: ['./list-books.component.css']
})

export class ListBooksComponent implements OnInit {
  books: Book;
  bookFilter: BookFilter;
  totalRecords: number;

  constructor(private bookService: BookService, private router: Router) {
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
        this.books = result.books;
        this.totalRecords = result.totalRecords;
      });
  }

  viewBook(_id: string): void {
    this.router.navigate([
      '/books/viewbook/', _id]);
  }

  deleteBook(_id: string): void {
    this.bookService.deleteBook(_id)
      .subscribe(() => {
        this.loadBooks();
      });
  }

  editBook(_id: string): void {
    this.router.navigate(['/books/editbook/', _id]);
  }

  searchBooks(event): void {
    this.books = event;
  }

  pageChange(event: any) {
    this.bookFilter.page = event.page;
    this.bookFilter.pageSize = event.pageSize;
    this.loadBooks();
  }

  onSearch({ author, title }): void {
    this.bookFilter.page = 1;
    this.bookFilter.author = author;
    this.bookFilter.title = title;
    this.loadBooks();
  }
}
