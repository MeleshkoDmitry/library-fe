import { Component, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-books-search',
  templateUrl: './books-search.component.html',
  styleUrls: ['./books-search.component.css']
})

export class BooksSearchComponent {
  @Output() searchEvent: EventEmitter<any> = new EventEmitter();

  title: string;
  author: string;

  constructor(private store: Store<any>) { }

  search() {
    this.store.dispatch({
      type: 'SEARCH_BOOKS',
      searchBooks: { title: this.title, author: this.author }
    });
    this.searchEvent.emit();
  }

}
