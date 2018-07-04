import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Book } from '../book';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-view-a-book',
  templateUrl: './view-a-book.component.html',
  styleUrls: ['./view-a-book.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ViewABookComponent {
  book: Book;

  constructor(private router: Router, private route: ActivatedRoute, private store: Store<any>) {
    this.book = this.route.snapshot.data.book;
  }

  viewAllBooks() {
    // this.store.dispatch({ type: 'RESET' });
    this.router.navigate(['/books']);
  }
}
