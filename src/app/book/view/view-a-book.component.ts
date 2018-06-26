import { Component, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Book } from '../book';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-view-a-book',
  templateUrl: './view-a-book.component.html',
  styleUrls: ['./view-a-book.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ViewABookComponent implements OnDestroy {
  book: Book;
  bookState: any;
  constructor(private router: Router, private route: ActivatedRoute, private store: Store<any>) {
    this.bookState = this.store.subscribe((result) => {
      this.book = result.book;
    });
  }

  viewAllBooks() {
    this.router.navigate(['/books']);
  }

  unsubscribe() {
    this.bookState.unsubscribe();
  }

  ngOnDestroy() {
    this.unsubscribe();
  }
}
