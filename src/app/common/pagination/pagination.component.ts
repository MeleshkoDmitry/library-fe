import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges, SimpleChanges } from '@angular/core';
import { Pagination } from '../../book/book';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PaginationComponent implements OnChanges {
  totalPages: number;
  selectPageSize = [1, 5, 10, 15];

  @Input() pagination: Pagination;
  @Output() pageEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.pagination.currentValue && !changes.pagination.firstChange) {
      this.createTotalPages();
    }
  }

  createTotalPages() {
    this.totalPages = Math.ceil(this.pagination.totalRecords / this.pagination.pageSize);
  }

  next(): void {
    this.pageEvent.emit({ page: this.pagination.page + 1, pageSize: this.pagination.pageSize });
  }

  prev(): void {
    this.pageEvent.emit({ page: this.pagination.page - 1, pageSize: this.pagination.pageSize });
  }

  changeValue(): void {
    this.pageEvent.emit({ page: this.pagination.page, pageSize: this.pagination.pageSize });
    this.createTotalPages();
    this.pagination.page > this.totalPages ? this.pagination.page = 1 : this.pagination.page = this.pagination.page;
  }
}
