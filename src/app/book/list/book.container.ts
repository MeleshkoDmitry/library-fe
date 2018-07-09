import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { BookFilter, Pagination } from '../book';
import {
    selectListQueryPagination, selectListBooks,
    selectListQueryFilter, selectDelete, selectListQuery
} from '../store/reducers/book.reducer';
import { Subscription } from 'rxjs';

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

    queryParams: any;
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
        this.store.dispatch({ type: 'VIEW_LIST_BOOKS', payload: this.queryParams });
    }

    pageChange(event: Pagination) {
        this.store.dispatch({ type: 'PAGINATION', payload: event });
        this.loadBooks();
    }

    onSearch(event: BookFilter): void {
        this.store.dispatch({
            type: 'SEARCH_BOOKS', payload: { title: event.title, author: event.author }
        });
        this.loadBooks();
    }

    ngOnDestroy() {
        this.subscriber.unsubscribe();
    }
}
