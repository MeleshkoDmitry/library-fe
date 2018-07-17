import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { BookFilter, Pagination } from '../book';
import {
  selectListQueryPagination, selectListBooks,
  selectListQueryFilter, selectListDelete, selectListQuery, IBookListStateQuery
} from '../store/reducers/book-reducer';
import { Subscription, ReplaySubject } from 'rxjs';
import { LoadBooks, PaginationAction, SearchBooks, QuerySearchBooks, Delete } from '../store/actions/books-actions';
import { ActivatedRoute } from '@angular/router';
import { Go } from '../../common/store/actions/navigate-actions';

@Component({
  selector: 'app-container-book',
  template: `
    <app-books-search
        [filter]="filter$ | async"
        (searchEvent)="onSearch($event)">
    </app-books-search>
    <app-list-books
        [books]="(items$ | async).books"
         (moveToViewEvent)="viewBook($event)"
         (moveToEditEvent)="editBook($event)"
         (deleteEvent)="deleteBook($event)">
    </app-list-books>
    <app-pagination
        [pagination]="mergedPagination | async"
        (pageEvent)="pageChange($event)">
    </app-pagination>
    `,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class BookContainerComponent implements OnInit, OnDestroy {
  items$: any;
  pagination$: any;
  filter$: any;
  delete$: any;
  query$: any;

  mergedPagination: any;
  subscriber: Subscription = new Subscription();

  constructor(private store: Store<any>,
              private route: ActivatedRoute) {
    this.items$ = this.store.select(selectListBooks);
    this.pagination$ = this.store.select(selectListQueryPagination);
    this.filter$ = this.store.select(selectListQueryFilter);
    this.query$ = this.store.select(selectListQuery);
    this.delete$ = this.store.select(selectListDelete);
  }

  ngOnInit(): void {
    this.subscriber.add(this.query$.subscribe((result: IBookListStateQuery) => {
      result.firstLoad ? this.querySearch() :
        this.loadBooks(result);
      this.delete$.subscribe(deleteResult => {
        if (deleteResult) { this.loadBooks(result); }
      });
    }));
    this.generatePagination();
  }

  loadBooks(querySearch: IBookListStateQuery): void {
    this.store.dispatch(new LoadBooks(querySearch));
  }

  pageChange(event: Pagination): void {
    this.store.dispatch(new PaginationAction(event));
  }

  onSearch(event: BookFilter): void {
    this.store.dispatch(new SearchBooks(event));
  }

  querySearch(): void {
    const queryParams: BookFilter = {
      title: this.route.snapshot.queryParams.title || '',
      author: this.route.snapshot.queryParams.author || ''
    };
    this.store.dispatch(new QuerySearchBooks(queryParams));
  }

  generatePagination(): void {
    this.mergedPagination = new ReplaySubject();

    let pagination;
    let totalRecords;

    this.subscriber.add(this.pagination$.subscribe(p => {
      pagination = p;
      if (pagination != null && totalRecords != null) {
        this.mergedPagination.next({ ...pagination, totalRecords });
      }
    }));
    this.subscriber.add(this.items$.subscribe(i => {
      totalRecords = i.totalRecords;
      if (pagination != null && totalRecords != null) {
        this.mergedPagination.next({ ...pagination, totalRecords });
      }
    }));
  }

  viewBook(event: string): void {
    this.store.dispatch(new Go({
      path: ['/books/viewbook/', event]
    }));
  }

  editBook(event: string): void {
    this.store.dispatch(new Go({
      path: ['/books/editbook/', event],
    }));
  }

  deleteBook(event: string): void {
    this.store.dispatch(new Delete(event));
  }

  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }
}
