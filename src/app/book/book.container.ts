import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Book, BookFilter } from './book';
import { selectListPagination, selectListBooks, selectListFilter } from './store/reducers/book.reducer';
import { RESOURCE_CACHE_PROVIDER } from '@angular/platform-browser-dynamic';

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
})

export class BookContainerComponent implements OnInit {
    books: Book[];
    totalRecords: number;

    bookFilter: BookFilter;
    items$: any;
    pages$: any;
    filter$: any;

    constructor(private store: Store<any>) {
        this.bookFilter = new BookFilter();
        this.bookFilter.page = 1;
        this.bookFilter.pageSize = 5;
        this.bookFilter.sort = '-1';
        this.items$ = this.store.select(selectListBooks);
        this.pages$ = this.store.select(selectListPagination);
        this.filter$ = this.store.select(selectListFilter);
    }

    ngOnInit(): void {
        this.loadBooks();
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
            console.log(`result:`, result);
            this.bookFilter.page = 1;
            this.bookFilter.title = result.title;
            this.bookFilter.author = result.author;
            this.loadBooks();
        });
    }
}
