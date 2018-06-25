import { OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Component, Input, Output, EventEmitter, SimpleChanges, ChangeDetectionStrategy, } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../reducers/pagination';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PaginationComponent implements OnChanges, OnDestroy, OnInit {
  totalPages: number;
  currentPageSub: any;
  @Input() page: number;
  @Input() pageSize: number;
  @Input() totalRecords: number;

  @Output() pageEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(private store: Store<AppState>) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.totalRecords && !changes.totalRecords.firstChange) {
      this.createTotalPages();
    }
  }

  ngOnInit() {
    this.subscribe();
  }
  numberOnly(event): boolean {
    return !isNaN(+event.key);
  }

  next(): void {
    this.store.dispatch({ type: 'INCREMENT' });
    this.pageEvent.emit({ page: this.page, pageSize: this.pageSize });
  }

  prev(): void {
    this.store.dispatch({ type: 'DECREMENT' });
    this.pageEvent.emit({ page: this.page, pageSize: this.pageSize });
  }

  changeValue(): void {
    this.store.dispatch({ type: 'PAGE_SIZE', pageSize: +this.pageSize });
    this.pageEvent.emit({ page: this.page, pageSize: this.pageSize });
    this.createTotalPages();
  }

  subscribe() {
    this.currentPageSub = this.store.subscribe((result) => {
      this.page = result.pagination.currentState;
      this.page > this.totalPages ? this.page = 1 : this.page = this.page;
    });
  }

  createTotalPages() {
    this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
  }
  unsubscribe() {
    this.currentPageSub.unsubscribe();
  }

  ngOnDestroy() {
    this.unsubscribe();
  }
}
