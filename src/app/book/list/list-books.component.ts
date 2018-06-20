import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { Book } from '../book';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-books',
  templateUrl: './list-books.component.html',
  styleUrls: ['./list-books.component.css']
})

export class ListBooksComponent implements OnInit {
  books: Book;
  page: number;
  perPage: number;
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

  prefPage() {
    --this.page;
    this.loadBooks();
  }
  nextPage() {
    ++this.page;
    this.loadBooks();
  }
}
