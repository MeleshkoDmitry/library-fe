import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges, SimpleChanges } from '@angular/core';
import { Pagination } from '../../book/book';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PaginationComponent implements OnChanges {

  selectPageSize = [1, 5, 10, 15];
  @Input() pagination: Pagination;
  @Output() pageEvent: EventEmitter<any> = new EventEmitter<any>();

  ngOnChanges(changes: SimpleChanges) {
    if (changes.pagination.currentValue && !changes.pagination.firstChange) {
      this.totalPages();
    }
  }

  totalPages(): number {
    return Math.ceil(this.pagination.totalRecords / this.pagination.pageSize) || 0;
  }

  onNext(): void {
    this.pageEvent.emit({ page: this.pagination.page + 1, pageSize: this.pagination.pageSize });
  }

  onPrev(): void {
    this.pageEvent.emit({ page: this.pagination.page - 1, pageSize: this.pagination.pageSize });
  }

  changeValue(): void {
    this.totalPages();
    this.pageEvent.emit({ page: 1, pageSize: this.pagination.pageSize });
  }

  getPages(): number[] {
    const pages: number[] = [this.pagination.page];
    const pagesToShow = 5;

    for (let i = 0; i < pagesToShow; i++) {
      if (pages.length < pagesToShow) {
        if (Math.min(...pages) > 1) {
          pages.push(Math.min(...pages) - 1);
        }
      }
      if (pages.length < pagesToShow) {
        if (Math.max(...pages) < this.totalPages()) {
          pages.push(Math.max(...pages) + 1);
        }
      }
    }
    pages.sort((a, b) => a - b);
    return pages;
  }

  onPage(pageNumber: number): void {
    this.pageEvent.emit({ page: pageNumber, pageSize: this.pagination.pageSize });
  }
}
