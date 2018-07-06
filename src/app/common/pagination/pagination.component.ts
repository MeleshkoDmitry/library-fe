import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges, SimpleChanges, } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Pagination } from '../../book/book';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PaginationComponent implements OnChanges {
  totalPages: number;
  subscriber: Subscription;

  @Input() pagination: Pagination;

  @Output() pageEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(private store: Store<any>) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.pagination.currentValue && !changes.pagination.firstChange) {
      this.createTotalPages();
    }
    this.pagination.page > this.totalPages ? this.pagination.page = 1 : this.pagination.page = this.pagination.page;
  }

  numberOnly(event): boolean {
    return !isNaN(+event.key);
  }

  next(): void {
    this.store.dispatch({ type: 'INCREMENT_BOOKS_PAGINATION' });
    this.pageEvent.emit({ page: this.pagination.page, pageSize: this.pagination.pageSize });
  }

  prev(): void {
    this.store.dispatch({ type: 'DECREMENT_BOOKS_PAGINATION' });
    this.pageEvent.emit({ page: this.pagination.page, pageSize: this.pagination.pageSize });
  }

  changeValue(): void {
    this.store.dispatch({ type: 'PAGE_SIZE_BOOKS_PAGINATION', payload: +this.pagination.pageSize });
    this.pageEvent.emit({ page: this.pagination.page, pageSize: this.pagination.pageSize });
    this.createTotalPages();
  }

  createTotalPages() {
    this.totalPages = Math.ceil(this.pagination.totalRecords / this.pagination.pageSize);
  }
}
