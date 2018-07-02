import { OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Component, Input, Output, EventEmitter, SimpleChanges, ChangeDetectionStrategy, } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectListPagination, selectFeature } from '../../book/store/reducers/book.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PaginationComponent implements OnChanges {
  totalPages: number;
  currentPageSub: Subscription;

  @Input() page: number;
  @Input() pageSize: number;
  @Input() totalRecords: number;

  @Output() pageEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(private store: Store<any>) { this.subscribe(); }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.totalRecords && !changes.totalRecords.firstChange) {
      this.createTotalPages();
    }
  }

  numberOnly(event): boolean {
    return !isNaN(+event.key);
  }

  next(): void {
    this.store.dispatch({ type: 'INCREMENT' });
    this.subscribe();
    this.currentPageSub.unsubscribe();
    this.pageEvent.emit({ page: this.page, pageSize: this.pageSize });
  }

  prev(): void {
    this.store.dispatch({ type: 'DECREMENT' });
    this.subscribe();
    this.currentPageSub.unsubscribe();
    this.pageEvent.emit({ page: this.page, pageSize: this.pageSize });
  }

  changeValue(): void {
    this.store.dispatch({ type: 'PAGE_SIZE', pageSize: +this.pageSize });
    this.pageEvent.emit({ page: this.page, pageSize: this.pageSize });
    this.createTotalPages();
  }

  createTotalPages() {
    this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
  }

  subscribe() {
    this.currentPageSub = this.store.select(selectListPagination)
      .subscribe(result => {
        console.log(`result`, result);
        this.page = result.page;
        this.page > this.totalPages ? this.page = 1 : this.page = this.page;
      });
  }
}
