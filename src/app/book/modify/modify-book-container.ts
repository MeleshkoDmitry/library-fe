import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../book';
import { BookService } from '../book.service';
import { Store } from '@ngrx/store';
import { AddBookService, EditBookService } from '../store/actions/books-actions';
import { Go } from '../store/actions/navigate-actions';
import { selectViewBook } from '../store/reducers/book-reducer';

@Component({
  selector: 'app-modify-container-book',
  template: `
    <app-modify-book
       [book]="book"
       (moveBack)="viewBooks()"
       (save)="modify($event)">
    </app-modify-book>`,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModifyBookContainerComponent {
  book: Book;
  id: string;

  constructor(private route: ActivatedRoute,
    private store: Store<Book>) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.id ? this.book = this.route.snapshot.data.book
      : this.book = new Book();
  }

  modify(event: Book): void {
    this.book._id ? this.store.dispatch(new EditBookService(event))
      : this.store.dispatch(new AddBookService(event));
  }

  viewBooks() {
    this.store.dispatch(new Go({
      path: ['/books/'],
    }));
  }
}
