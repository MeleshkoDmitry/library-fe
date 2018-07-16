import { Action } from '@ngrx/store';
import { IBookListStateQuery } from '../reducers/book-reducer';
import { Book, Pagination, BookFilter, IBookListItems } from '../../book';

export enum BookActionTypes {
    LoadBooks = '[Books] Load',
    LoadBooksSuccess = '[Books] Load Success',
    AddBookService = '[Books] Add Service',
    EditBookService = '[Books] Edit Service',
    View = '[Books] View',
    ViewSuccess = '[Books] View Success',
    Edit = '[Books] Edit',
    EditSuccess = '[Books] Edit Success',
    Delete = '[Books] Delete',
    DeleteSuccess = '[Books] Delete Success',
    PaginationAction = '[Books] Pagination Event',
    SearchBooks = '[Books] Search Books',
    QuerySearchBooks = '[Books] Query Search Books'
}

export class LoadBooks implements Action {
    readonly type: string = BookActionTypes.LoadBooks;
    constructor(public payload: IBookListStateQuery) { }
}

export class LoadBooksSuccess implements Action {
    readonly type: string = BookActionTypes.LoadBooksSuccess;
    constructor(public payload: IBookListItems) { }
}

export class AddBookService implements Action {
    readonly type: string = BookActionTypes.AddBookService;
    constructor(public payload: Book) { }
}

export class EditBookService implements Action {
    readonly type: string = BookActionTypes.EditBookService;
    constructor(public payload: Book) { }
}

export class View implements Action {
    readonly type: string = BookActionTypes.View;
    constructor(public payload: string) { }
}

export class ViewSuccess implements Action {
    readonly type: string = BookActionTypes.ViewSuccess;
    constructor(public payload: Book) { }
}

export class Edit implements Action {
    readonly type: string = BookActionTypes.Edit;
    constructor(public payload: string) { }
}

export class EditSuccess implements Action {
    readonly type: string = BookActionTypes.EditSuccess;
    constructor(public payload: Book) { }
}

export class Delete implements Action {
    readonly type: string = BookActionTypes.Delete;
    constructor(public payload: string) { }
}

export class DeleteSuccess implements Action {
    readonly type: string = BookActionTypes.DeleteSuccess;
    constructor() { }
}

export class PaginationAction implements Action {
    readonly type: string = BookActionTypes.PaginationAction;
    constructor(public payload: Pagination) { }
}

export class SearchBooks implements Action {
    readonly type: string = BookActionTypes.SearchBooks;
    constructor(public payload: BookFilter) { }
}

export class QuerySearchBooks implements Action {
    readonly type: string = BookActionTypes.QuerySearchBooks;
    constructor(public payload: BookFilter) { }
}

export type BooksActionsUnion =
    | LoadBooks
    | LoadBooksSuccess
    | View
    | ViewSuccess
    | Edit
    | EditSuccess
    | Delete
    | PaginationAction
    | SearchBooks
    | AddBookService
    | EditBookService
    | QuerySearchBooks;
