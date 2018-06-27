import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { BookService } from '../../book/book.service';
import { Actions, Effect, ofType } from '@ngrx/effects';

@Injectable()
export class PaginationEffect {
    constructor(private bookService: BookService, private actions$: Actions) { }

    @Effect()
    pagination$: Observable<any> = this.actions$.pipe(
        ofType('INCREMENT', 'DECREMENT', 'PAGE_SIZE'),
        mergeMap((action: any) => this.bookService.viewListBooks(action.payload).pipe(
            map(data => ({ type: 'VIEW_LIST_BOOKS_SUCCESS', payload: data })),
            catchError(() => of({ type: 'VIEW_LIST_BOOKS_FAILED' }))
        ))
    );
}
