import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { BookFilter } from '../../book';

@Component({
  selector: 'app-books-search',
  templateUrl: './books-search.component.html',
  styleUrls: ['./books-search.component.css']
})

export class BooksSearchComponent implements OnInit {

  title: any;
  author: any;
  @Input() filter: BookFilter;

  @Output() searchEvent: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.title = this.filter.title;
    this.author = this.filter.author;
  }
  search() {
    this.searchEvent.emit({ title: this.title, author: this.author });
  }
}


