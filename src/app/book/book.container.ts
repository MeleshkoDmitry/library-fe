import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Book, QueryParams, Pagination } from './book';
import { selectListPagination, selectListBooks, selectListFilter, selectDelete } from './store/reducers/book.reducer';

@Component({
    selector: 'app-container-book',
    template: `
    <app-books-search
        (searchEvent)="onSearch($event)">
    </app-books-search>
    <app-pagination
        [pagination]="(pages$ | async)"
        (pageEvent)="pageChange($event)">
    </app-pagination>
    <app-list-books
    [books]="(items$ | async)">
    </app-list-books>`,
    styles: [``],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class BookContainerComponent implements OnInit {
    books: Book[];

    queryParams: QueryParams = new QueryParams();
    pagination: Pagination = new Pagination();

    items$: any;
    pages$: any;
    filter$: any;
    delete$: any;

    constructor(private store: Store<any>) {
        this.items$ = this.store.select(selectListBooks);
        this.pages$ = this.store.select(selectListPagination);
        this.filter$ = this.store.select(selectListFilter);
        this.delete$ = this.store.select(selectDelete);

        this.pages$.subscribe((result: Pagination) => {
            this.queryParams.page = result.page;
            this.queryParams.pageSize = result.pageSize;
            this.pagination.page = this.queryParams.page;
            this.pagination.pageSize = this.queryParams.pageSize;
            this.pagination.totalRecords = result.totalRecords;
        });
    }

    ngOnInit(): void {
        this.loadBooks();
        this.delete$.subscribe(result => {
            if (result) { this.loadBooks(); }
            return false;
        });
    }

    loadBooks(): void {
        this.store.dispatch({ type: 'VIEW_LIST_BOOKS', payload: this.queryParams });
    }

    pageChange(event: any) {
        this.queryParams.page = event.page;
        this.queryParams.pageSize = event.pageSize;
        this.loadBooks();
    }

    onSearch(): void {
        this.filter$.subscribe(result => {
            this.queryParams.page = 1;
            this.queryParams.title = result.title;
            this.queryParams.author = result.author;
            this.loadBooks();
        });
    }
}
