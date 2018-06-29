import { Component, ChangeDetectionStrategy, Input, OnChanges } from '@angular/core';
import { BookService } from '../book.service';
import { Router } from '@angular/router';
import { Book } from '../book';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-list-books',
  templateUrl: './list-books.component.html',
  styleUrls: ['./list-books.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ListBooksComponent implements OnChanges {
  @Input() books: Book[];

  subscriber: any;

  constructor(
    private bookService: BookService,
    private router: Router,
    private store: Store<any>) { }

  ngOnChanges() { }
  viewBook(_id: string): void {
    this.router.navigate(['/books/viewbook/', _id]);
  }

  editBook(_id: string): void {
    this.router.navigate(['/books/editbook/', _id]);
  }
}
