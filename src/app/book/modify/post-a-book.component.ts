import { Component } from '@angular/core';
import { Book } from '../book';
import { BookService } from '../book.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-post-a-book',
  templateUrl: './post-a-book.component.html',
  styleUrls: ['./post-a-book.component.css']
})

export class ModifyComponent {

  book: Book;
  constructor(
    private bookService: BookService,
    private router: Router,
    private route: ActivatedRoute) {
    const _id = this.route.snapshot.paramMap.get('id');
    if (_id) {
      this.book = this.route.snapshot.data.book;
    } else {
      this.book = new Book();
    }
  }

  onSubmit(): void {
    this.save();
  }

  save(): void {
    let action;
    if (this.book._id) {
      action = this.bookService.editBook(this.book._id, this.book);
    } else {
      action = this.bookService.addBook(this.book);
    }
    action.subscribe((result) => {
      this.router.navigate(['/books/viewbook/', result._id]);
    });
  }

  viewAllBooks() {
    this.router.navigate(['/books']);
  }
}
