import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from '../book';
import { Store } from '@ngrx/store';
import { Delete } from '../store/actions/actions';

@Component({
  selector: 'app-list-books',
  templateUrl: './list-books.component.html',
  styleUrls: ['./list-books.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ListBooksComponent {
  @Input() books: Book[];

  displayedColumns: string[] = ['No', 'title', 'author', 'edit', 'delete'];

  constructor(private router: Router, private store: Store<any>) { }

  viewBook(_id: string): void {
    this.router.navigate(['/books/viewbook/', _id]);
  }
  editBook(_id: string): void {
    this.router.navigate(['/books/editbook/', _id]);
  }
  deleteBook(_id: string): void {
    this.store.dispatch(new Delete(_id));
  }
}
