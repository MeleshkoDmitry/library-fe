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
      payload: { title: this.title, author: this.author }
    });
    this.store.dispatch({ type: 'RESET_BOOKS_PAGINATION' });
    this.searchEvent.emit();
  }
}


