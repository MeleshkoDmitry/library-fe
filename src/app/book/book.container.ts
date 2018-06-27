import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Book, BookFilter } from './book';
import { Router } from '@angular/router';

@Component({
    selector: 'app-container-book',
    template: `
    <app-books-search
        (searchEvent)="onSearch($event)">
    </app-books-search>
    <app-pagination
        [page]="bookFilter.page"
        [pageSize]="bookFilter.pageSize"
        [totalRecords]="totalRecords"
        (pageEvent)="pageChange($event)">
    </app-pagination>
    <app-list-books
        [books]="books"
        [totalRecords]="totalRecords">
    </app-list-books>`,
    styles: [''],
    changeDetection: ChangeDetectionStrategy.OnPush
})

// tslint:disable-next-line:component-class-suffix
export class BookContainer {
    books: Book[];
    totalRecords: number;
    bookFilter: BookFilter;

    constructor(private store: Store<any>, private router: Router) {
        this.bookFilter = new BookFilter();
        this.bookFilter.page = 1;
        this.bookFilter.pageSize = 5;
        this.bookFilter.sort = '-1';
        this.loadBooks();
    }

    loadBooks() {
        this.store.dispatch({ type: 'VIEW_LIST_BOOKS', payload: this.bookFilter });
        this.store.select('listBooks').subscribe(result => {
            this.books = result.books;
            this.totalRecords = result.totalRecords;
        });
    }

    pageChange(event: any) {
        this.bookFilter.page = event.page;
        this.bookFilter.pageSize = event.pageSize;
        this.loadBooks();
    }
}
