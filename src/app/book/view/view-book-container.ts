import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../book';
import { Store } from '@ngrx/store';
import { Back } from '../../common/store/actions/navigate-actions';

@Component({
  selector: 'app-view-container-book',
  template: `
      <app-view-a-book
          [book]="book"
          (moveBack)="moveBack()">
      </app-view-a-book>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewBookContainerComponent {
  book: Book;
  constructor(private route: ActivatedRoute,
              private store: Store<any>) {
    this.book = this.route.snapshot.data.book;
  }

  moveBack() {
    this.store.dispatch(new Back);
  }
}
