import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Book, BookFilter } from './book';
import { selectList, selectListPagination, selectListBooks } from './store/reducers/book.reducer';

@Component({
    selector: 'app-container-book',
    template: `
    <app-books-search
        (searchEvent)="onSearch($event)">
    </app-books-search>
    <app-list-books
        [books]="(items$ | async).items?.books">
    </app-list-books>
    <app-pagination
        [page]="bookFilter.page"
        [pageSize]="bookFilter.pageSize"
        [totalRecords]="(items$ | async).items?.totalRecords"
        (pageEvent)="pageChange($event)">
    </app-pagination>`,
})

export class BookContainerComponent implements OnInit {
    books: Book[];
    totalRecords: number;

    bookFilter: BookFilter;
    items$: any;
    pages$: any;

    constructor(private store: Store<any>) {
        this.bookFilter = new BookFilter();
        this.bookFilter.page = 1;
        this.bookFilter.pageSize = 5;
        this.bookFilter.sort = '-1';
        this.items$ = this.store.select(selectList);
        this.pages$ = this.store.select(selectListPagination);
    }

    ngOnInit(): void {
        this.loadBooks();
        this.store.subscribe(console.log);
    }

    loadBooks(): void {
        this.store.dispatch({ type: 'VIEW_LIST_BOOKS', payload: this.bookFilter });
    }

    pageChange(event: any) {
        console.log(`event`, event);
        this.bookFilter.page = event.page;
        this.bookFilter.pageSize = event.pageSize;
        this.loadBooks();
    }

    onSearch(): void {
        /* this.store.subscribe((result) => {
            result.pagination.currentState = 1;
            this.bookFilter.title = result.searchBooks.title;
            this.bookFilter.author = result.searchBooks.author;
        }); */
    }
}
