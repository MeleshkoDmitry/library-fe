import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Book } from '../book';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectViewBook, selectEditBook } from '../store/reducers/book-reducer';
import { take, filter } from 'rxjs/operators';
import { SingleLoad, ViewSuccess, EditSuccess } from '../store/actions/books-actions';

class BookResolver<T> implements Resolve<T> {
    constructor(public store: Store<T>, private selector: any, private action: any, private nextActionType: any) {
    }
    resolve(route: ActivatedRouteSnapshot): Observable<T> {
        this.store.dispatch(new this.action(route.params.id, this.nextActionType));
        return this.store.select(this.selector)
            .pipe(
                filter((book: Book) => book._id === route.params.id),
                take(1));
    }
}

@Injectable()
export class ViewBookResolver extends BookResolver<Book> {
    constructor(store: Store<Book>) {
        super(store, selectViewBook, SingleLoad, ViewSuccess);
    }
}

@Injectable()
export class EditBookResolver extends BookResolver<Book> {
    constructor(store: Store<Book>) {
        super(store, selectEditBook, SingleLoad, EditSuccess);
    }
}
