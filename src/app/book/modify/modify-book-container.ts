import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../book';
import { Store } from '@ngrx/store';
import { AddBookService, EditBookService } from '../store/actions/books-actions';
import { Back } from '../../common/store/actions/navigate-actions';

@Component({
  selector: 'app-modify-container-book',
  template: `
    <app-modify-book
       [book]="book"
       (moveBack)="moveBack()"
       (save)="modify($event)">
    </app-modify-book>
    `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModifyBookContainerComponent {
  book: Book;

  constructor(private route: ActivatedRoute,
              private store: Store<Book>) {
    this.book = this.route.snapshot.data.book || new Book();
  }

  modify(event: Book): void {
    this.book._id ? this.store.dispatch(new EditBookService(event))
      : this.store.dispatch(new AddBookService(event));
  }

  moveBack(): void {
    this.store.dispatch(new Back);
  }
}
