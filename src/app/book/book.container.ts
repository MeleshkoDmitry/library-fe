import { Component, OnInit, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Book, BookFilter } from './book';
import { selectListPagination, selectListBooks, selectListFilter, selectDelete } from './store/reducers/book.reducer';

@Component({
    selector: 'app-container-book',
    template: `
    <app-books-search
        (searchEvent)="onSearch($event)">
    </app-books-search>
    <app-list-books
        [books]="(items$ | async)?.books">
    </app-list-books>
    <app-pagination
        [page]="bookFilter.page"
        [pageSize]="bookFilter.pageSize"
        [totalRecords]="(items$ | async)?.totalRecords"
        (pageEvent)="pageChange($event)">
    </app-pagination>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class BookContainerComponent implements OnInit {
    books: Book[];
    totalRecords: number;

    bookFilter: BookFilter;
    items$: any;
    pages$: any;
    filter$: any;
    delete$: any;

    constructor(private store: Store<any>) {
        this.items$ = this.store.select(selectListBooks);
        this.pages$ = this.store.select(selectListPagination);
        this.filter$ = this.store.select(selectListFilter);
        this.delete$ = this.store.select(selectDelete);

        this.pages$.subscribe(result => {
            this.bookFilter = new BookFilter();
            this.bookFilter.page = result.page;
            this.bookFilter.pageSize = result.pageSize;
        });
    }

    ngOnInit(): void {

        this.loadBooks();
        this.delete$.subscribe(result => {
            if (result) { this.loadBooks(); }
            return false;
        });
        this.pages$.subscribe(console.log);
    }

    loadBooks(): void {
        this.store.dispatch({ type: 'VIEW_LIST_BOOKS', payload: this.bookFilter });
    }

    pageChange(event: any) {
        this.bookFilter.page = event.page;
        this.bookFilter.pageSize = event.pageSize;
        this.loadBooks();
    }

    onSearch(): void {
        this.filter$.subscribe(result => {
            this.bookFilter.page = 1;
            this.bookFilter.title = result.title;
            this.bookFilter.author = result.author;
            this.loadBooks();
        });
    }
}
