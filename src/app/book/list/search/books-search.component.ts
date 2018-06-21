import { Component, Output, EventEmitter } from '@angular/core';

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

  constructor() { }

  search() {
    this.onSearch.emit({ title: this.title, author: this.author });
  }
}
