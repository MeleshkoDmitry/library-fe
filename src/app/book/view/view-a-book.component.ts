import { Component, OnDestroy, ChangeDetectionStrategy, Input, OnChanges } from '@angular/core';
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
  bookState: any;
  constructor(private router: Router, private route: ActivatedRoute, private store: Store<any>) {
    console.log(this.route.snapshot.data);
    this.book = this.route.snapshot.data.book;
  }

  viewAllBooks() {
    this.router.navigate(['/books']);
  }
}
