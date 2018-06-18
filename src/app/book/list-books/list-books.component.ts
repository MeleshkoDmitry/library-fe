import { Component, OnInit, Output } from '@angular/core';
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

  constructor(private bookService: BookService, private router: Router) { }

  ngOnInit() {
    this.bookService.viewListBooks(this.books)
      .subscribe((result) => {
        this.books = result;
      });
  }

  viewBook(_id: string) {
    this.router.navigate([
      '/books/viewbook/', _id]);
  }

  deleteBook(_id: string) {
    this.bookService.deleteBook(_id)
      .subscribe(() => {
        this.ngOnInit();
      });
  }

  editBook(_id: string) {
    this.router.navigate(['/books/editbook/', _id]);
  }

  bookFinded(event) {
    this.books = event;
  }
}
