import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Book } from '../../book';
import { BookService } from '../../book.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-books-search',
  templateUrl: './books-search.component.html',
  styleUrls: ['./books-search.component.css']
})

export class BooksSearchComponent implements OnInit {
  book: Book;
  page: string;

  @Output() foundBooks: EventEmitter<any> = new EventEmitter();

  constructor(private bookService: BookService, private router: Router) { this.book = new Book(); }

  ngOnInit() {
  }

  search() {
    this.bookService.viewListBooks(this.book, this.page)
      .subscribe((result) => {
        this.foundBooks.emit(result);
      });
  }
}
