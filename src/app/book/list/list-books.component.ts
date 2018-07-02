import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from '../book';

@Component({
  selector: 'app-list-books',
  templateUrl: './list-books.component.html',
  styleUrls: ['./list-books.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ListBooksComponent {
  @Input() books: Book[];

  subscriber: any;

  constructor(private router: Router) { }

  viewBook(_id: string): void {
    this.router.navigate(['/books/viewbook/', _id]);
  }

  editBook(_id: string): void {
    this.router.navigate(['/books/editbook/', _id]);
  }
}
