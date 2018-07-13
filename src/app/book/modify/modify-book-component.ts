import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Book } from '../book';
import { ErrorStateMatcher } from '@angular/material';
import { FormGroupDirective, FormControl, NgForm, Validators } from '@angular/forms';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-modify-book',
  templateUrl: './modify-component.html',
  styleUrls: ['./modify-component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ModifyComponent {
  @Input() book: Book;

  @Output() moveBack: EventEmitter<any> = new EventEmitter<any>();
  @Output() save: EventEmitter<Book> = new EventEmitter<Book>();

  titleController = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
    Validators.maxLength(20)
  ]);
  authorController = new FormControl('', [
    Validators.required,
    Validators.minLength(2),
    Validators.maxLength(10)
  ]);
  matcher = new MyErrorStateMatcher();
}


