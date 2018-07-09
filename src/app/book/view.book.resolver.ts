import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Book } from './book';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectViewBook } from './store/reducers/book.reducer';
import { take, filter } from 'rxjs/operators';
import { View } from './store/actions/actions';

@Injectable()

export class ViewBookResolver implements Resolve<Book> {
    constructor(private store: Store<Book>) { }
    book$: any;
    resolve(route: ActivatedRouteSnapshot): Observable<Book> {
        this.book$ = this.store
            .select(selectViewBook)
            .pipe(filter((book: Book) => book._id === route.params.id), take(1));
        this.store.dispatch(new View(route.params.id));
        return this.book$;
    }
}
