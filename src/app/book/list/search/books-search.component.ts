import { Component, Output, EventEmitter, Input, ChangeDetectionStrategy } from '@angular/core';
import { BookFilter } from '../../book';

@Component({
  selector: 'app-books-search',
  templateUrl: './books-search.component.html',
  styleUrls: ['./books-search.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class BooksSearchComponent {
  @Input() filter: BookFilter;
  @Output() searchEvent: EventEmitter<any> = new EventEmitter();

  search(): void {
    this.searchEvent.emit({
      title: this.filter.title,
      author: this.filter.author
    });
  }
}


