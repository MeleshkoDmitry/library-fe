import { Component } from '@angular/core';
import { Book } from '../book';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view-a-book',
  templateUrl: './view-a-book.component.html',
  styleUrls: ['./view-a-book.component.css']
})

export class ViewABookComponent {
  book: Book;

  constructor(private router: Router, private route: ActivatedRoute, ) {
    this.book = this.route.snapshot.data.book;
  }

  viewAllBooks() {
    this.router.navigate(['/books']);
  }
}
