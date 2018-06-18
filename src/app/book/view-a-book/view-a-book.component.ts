import { Component } from '@angular/core';
import { Book } from '../book';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view-a-book',
  templateUrl: './view-a-book.component.html',
  styleUrls: ['./view-a-book.component.css']
})

export class ViewABookComponent {

  constructor(private router: Router, private route: ActivatedRoute, private book: Book) {
    this.route.data.subscribe((result) => {
      this.book = result.book;
    });
  }

  viewAllBooks() {
    this.router.navigate(['/books']);
  }
}
