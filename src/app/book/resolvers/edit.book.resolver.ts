import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Book } from '../book';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectEditBook } from '../store/reducers/book.reducer';
import { take, filter } from 'rxjs/operators';
import { Edit } from '../store/actions/actions';

@Injectable()

export class EditBookResolver implements Resolve<Book> {
    constructor(private store: Store<Book>) { }
    book$: any;
    resolve(route: ActivatedRouteSnapshot): Observable<Book> {
        this.book$ = this.store.
            select(selectEditBook).
            pipe(filter((book: Book) => book._id === route.params.id), take(1));
        this.store.dispatch(new Edit(route.params.id));
        return this.book$;
    }
}
