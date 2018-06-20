import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
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
  @Input() private perPage: any;
  @Input() private page: any;
  @Output() foundBooks: EventEmitter<any> = new EventEmitter();

  constructor(private bookService: BookService, private router: Router) { this.book = new Book(); }

  ngOnInit() {
  }

  search() {
    this.bookService.viewListBooks(this.book, this.page, this.perPage)
      .subscribe((result) => {
        this.foundBooks.emit(result[0]);
      });
  }
}
