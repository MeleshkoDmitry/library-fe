import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { BookService } from '../../book.service';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Book } from '../../book';

@Injectable()
export class BooksEffects {
    constructor(private bookService: BookService, private actions$: Actions) { }

    @Effect()
    load$: Observable<any> = this.actions$.pipe(
        ofType('VIEW_LIST_BOOKS'),
        switchMap((action: any) => this.bookService.viewListBooks(action.payload).pipe(
            map(data => ({ type: 'VIEW_LIST_BOOKS_SUCCESS', payload: data })),
            catchError(() => of({ type: 'VIEW_LIST_BOOKS_FAILED' }))
        ))
    );

    @Effect()
    view$: Observable<any> = this.actions$.pipe(
        ofType('VIEW_BOOK'),
        switchMap((action: any) => this.bookService.viewBook(action.payload).pipe(
            map((data: Book) => ({ type: 'VIEW_BOOK_SUCCESS', payload: data })),
            catchError(() => of({ type: 'VIEW_BOOK_FAILED' }))
        ))
    );

    @Effect()
    edit$: Observable<any> = this.actions$.pipe(
        ofType('EDIT_BOOK'),
        switchMap((action: any) => this.bookService.viewBook(action.payload).pipe(
            map((data: Book) => ({ type: 'EDIT_BOOK_SUCCESS', payload: data })),
            catchError(() => of({ type: 'EDIT_BOOK_FAILED' }))
        ))
    );
}
