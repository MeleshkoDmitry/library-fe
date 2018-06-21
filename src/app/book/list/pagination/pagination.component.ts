import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BookFilter } from '../../book.filter';
import { isNumber } from 'util';
import { Book } from '../../book';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {
  book: Book;
  @Input() private bookFilter: BookFilter;

  @Output() pageChange: EventEmitter<BookFilter> = new EventEmitter<BookFilter>();

  constructor() { }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  next(): void {
    this.bookFilter.page = this.bookFilter.page + 1;
    this.pageChange.emit(this.bookFilter);
  }

  prev(): void {
    this.bookFilter.page = this.bookFilter.page - 1;
    this.pageChange.emit(this.bookFilter);
  }

  changeValue(event): void {
    isNumber(+event.target.value) ? this.bookFilter.pageSize = +event.target.value : this.bookFilter.pageSize = 5;
    this.bookFilter.page = 1;
    this.pageChange.emit(this.bookFilter);
  }

}
