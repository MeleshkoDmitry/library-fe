import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Book } from '../../book';
import { BookService } from '../../book.service';
import { Router } from '@angular/router';
import { BookFilter } from '../../book.filter';

@Component({
  selector: 'app-books-search',
  templateUrl: './books-search.component.html',
  styleUrls: ['./books-search.component.css']
})

export class BooksSearchComponent {

  // tslint:disable-next-line:no-output-on-prefix
  @Output() onSearch: EventEmitter<any> = new EventEmitter();

  private title: string;
  private author: string;
  private bookFilter: BookFilter;


  constructor() { }

  search() {
    this.onSearch.emit({ title: this.title, author: this.author });
  }
}
