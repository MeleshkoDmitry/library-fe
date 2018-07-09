import { Component, Output, EventEmitter, Input } from '@angular/core';
import { BookFilter } from '../../book';

@Component({
  selector: 'app-books-search',
  templateUrl: './books-search.component.html',
  styleUrls: ['./books-search.component.css']
})

export class BooksSearchComponent {
  @Output() searchEvent: EventEmitter<any> = new EventEmitter();

  @Input() filter: BookFilter;

  constructor() { }

  search() {
    this.searchEvent.emit({ title: this.filter.title, author: this.filter.author });
  }
}


