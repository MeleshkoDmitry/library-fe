import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Book } from '../book';

@Component({
  selector: 'app-list-books',
  templateUrl: './list-books.component.html',
  styleUrls: ['./list-books.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ListBooksComponent {
  displayedColumns: string[] = ['No', 'title', 'author', 'edit', 'delete'];

  @Input() books: Book[];

  @Output() moveToViewEvent: EventEmitter<string> = new EventEmitter<string>();
  @Output() moveToEditEvent: EventEmitter<string> = new EventEmitter<string>();
  @Output() deleteEvent: EventEmitter<string> = new EventEmitter<string>();
}
