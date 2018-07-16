import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap, map, tap } from 'rxjs/operators';
import { BookService } from '../../book.service';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { IBookListItems } from '../../book';
import {
    BookActionTypes, LoadBooksSuccess, ViewSuccess, DeleteSuccess,
} from '../actions/books-actions';
import { Router } from '@angular/router';

interface Action {
    type: string; payload?: any; nextActionType?: any;
}

@Injectable()
export class BooksEffects {
    constructor(private actions$: Actions, private bookService: BookService, private router: Router) { }

    @Effect()
    load$: Observable<LoadBooksSuccess> = this.actions$.pipe(
        ofType(BookActionTypes.LoadBooks),
        switchMap((action: Action) => this.bookService.viewListBooks(action.payload).pipe(
            map((result: IBookListItems) => new LoadBooksSuccess(result))
        ))
    );

    @Effect()
    singleLoad$: Observable<any> = this.actions$.pipe(
        ofType(BookActionTypes.SingleLoad),
        switchMap((action: Action) => this.bookService.viewBook(action.payload).pipe(
            map((result) => new action.nextActionType(result)))));

    @Effect()
    delete$: Observable<DeleteSuccess> = this.actions$.pipe(
        ofType(BookActionTypes.Delete),
        switchMap((action: Action) => this.bookService.deleteBook(action.payload).pipe(
            map(() => new DeleteSuccess()))
        ));

    @Effect()
    editService$: Observable<any> = this.actions$.pipe(
        ofType(BookActionTypes.EditBookService),
        switchMap((action: Action) => this.bookService.editBook(action.payload._id, action.payload).pipe(
            tap((result) => {
                this.router.navigate(['/books/viewbook/', result._id], { skipLocationChange: true });
            }),
            map(result => new ViewSuccess(result)))));

    @Effect({ dispatch: false })
    addService$: Observable<any> = this.actions$.pipe(
        ofType(BookActionTypes.AddBookService),
        switchMap((action: Action) => this.bookService.addBook(action.payload).pipe(
            tap((result) => this.router.navigate(['/books/viewbook/', result._id], { skipLocationChange: true }))
        )));
}
