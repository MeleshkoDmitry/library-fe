import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-books-search',
  templateUrl: './books-search.component.html',
  styleUrls: ['./books-search.component.css']
})

export class BooksSearchComponent {
  @Output() searchEvent: EventEmitter<any> = new EventEmitter();

  title: string;
  author: string;

  constructor() { }

  search() {
    this.searchEvent.emit({ title: this.title, author: this.author });
  }

}
