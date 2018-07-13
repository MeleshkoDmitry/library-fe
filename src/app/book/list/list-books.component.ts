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

  @Output() moveToView: EventEmitter<string> = new EventEmitter<string>();
  @Output() moveToEdit: EventEmitter<string> = new EventEmitter<string>();

  /*   deleteBook(_id: string): void {
      this.store.dispatch(new Delete(_id));
    } */
}
