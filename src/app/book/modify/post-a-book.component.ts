import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Book } from '../book';
import { BookService } from '../book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-post-a-book',
  templateUrl: './post-a-book.component.html',
  styleUrls: ['./post-a-book.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ModifyComponent {
  titleController = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
  ]);

  authorController = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
  ]);
  matcher = new MyErrorStateMatcher();

  book: Book;

  constructor(
    private bookService: BookService,
    private router: Router,
    private route: ActivatedRoute) {
    const _id = this.route.snapshot.paramMap.get('id');
    _id ? this.book = this.route.snapshot.data.book : this.book = new Book();
  }

  onSubmit(): void {
    this.save();
  }

  save(): void {
    let action;
    this.book._id ? action = this.bookService.editBook(this.book._id, this.book)
      : action = this.bookService.addBook(this.book);

    action.subscribe((result) => {
      this.router.navigate(['/books/viewbook/', result._id]);
    });
  }

  viewAllBooks() {
    this.router.navigate(['/books']);
  }
}


