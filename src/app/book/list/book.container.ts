import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { BookFilter, Pagination } from '../book';
import {
    selectListQueryPagination, selectListBooks,
    selectListQueryFilter, selectDelete, selectListQuery, IBookListStateQuery
} from '../store/reducers/book.reducer';
import { Subscription } from 'rxjs';
import { Load, PaginationEvent, SearchBooks } from '../store/actions/actions';

@Component({
    selector: 'app-container-book',
    template: `
    <app-books-search
        [filter]="(filter$ | async)"
        (searchEvent)="onSearch($event)">
    </app-books-search>
    <app-list-books
        [books]="(items$ | async)">
    </app-list-books>
    <app-pagination
        [pagination]="(pagination$ | async)"
        (pageEvent)="pageChange($event)">
    </app-pagination>`,
    styles: [``],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class BookContainerComponent implements OnInit, OnDestroy {
    items$: any;
    pagination$: any;
    filter$: any;
    delete$: any;
    query$: any;

    queryParams: IBookListStateQuery;
    subscriber: Subscription = new Subscription();

    constructor(private store: Store<any>) {
        this.items$ = this.store.select(selectListBooks);
        this.pagination$ = this.store.select(selectListQueryPagination);
        this.filter$ = this.store.select(selectListQueryFilter);
        this.delete$ = this.store.select(selectDelete);
        this.query$ = this.store.select(selectListQuery);

        this.subscriber.add(this.query$.subscribe(result => this.queryParams = result));
    }

    ngOnInit(): void {
        this.loadBooks();
        this.subscriber.add(this.delete$.subscribe(result => {
            if (result) { this.loadBooks(); }
            return false;
        }));
    }

    loadBooks(): void {
        this.store.dispatch(new Load(this.queryParams));
    }

    pageChange(event: Pagination) {
        this.store.dispatch(new PaginationEvent(event));
        this.loadBooks();
    }

    onSearch(event: BookFilter): void {
        this.store.dispatch(new SearchBooks(event));
        this.loadBooks();
    }

    ngOnDestroy() {
        this.subscriber.unsubscribe();
    }
}
