import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Book } from '../book';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectViewBook, selectEditBook } from '../store/reducers/book-reducer';
import { take, filter } from 'rxjs/operators';
import { View, Edit } from '../store/actions/books-actions';

class BookResolver<T> implements Resolve<T> {
    constructor(private baseStore: Store<T>, private selector: any, private action: any) {
    }
    resolve(route: ActivatedRouteSnapshot): Observable<T> {
        this.baseStore.dispatch(new this.action(route.params.id));
        return this.baseStore.select(this.selector)
            .pipe(
                filter((book: Book) => book._id === route.params.id),
                take(1));
    }
}

@Injectable()
export class ViewBookResolver extends BookResolver<Book> {
    constructor(private store: Store<Book>) {
        super(store, selectViewBook, View);
    }
}

@Injectable()
export class EditBookResolver extends BookResolver<Book> {
    constructor(private store: Store<Book>) {
        super(store, selectEditBook, Edit);
    }
}
