import { Action } from '@ngrx/store';
import { IBookListStateQuery } from '../reducers/book.reducer';
import { Book, Pagination, BookFilter } from '../../book';

export enum BookActionTypes {
    Load = '[Books] Load',
    LoadSuccess = '[Books] Load Success',
    View = '[Books] View',
    ViewSuccess = '[Books] View Success',
    Edit = '[Books] Edit',
    EditSuccess = '[Books] Edit Success',
    Delete = '[Books] Delete',
    DeleteSuccess = '[Books] Delete Success',
    PaginationEvent = '[Books] Pagination Event',
    PaginationEventSuccess = '[Books] Pagination Event Success',
    SearchBooks = '[Books] Search Books'
}

export class Load implements Action {
    readonly type: string = BookActionTypes.Load;
    constructor(public payload: IBookListStateQuery) { }
}

export class LoadSuccess implements Action {
    readonly type: string = BookActionTypes.LoadSuccess;
    constructor(public payload: Book[]) { }
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

export class PaginationEvent implements Action {
    readonly type: string = BookActionTypes.PaginationEvent;
    constructor(public payload: Pagination) { }
}

export class PaginationEventSuccess implements Action {
    readonly type: string = BookActionTypes.PaginationEventSuccess;
    constructor(public payload: Pagination) { }
}

export class SearchBooks implements Action {
    readonly type: string = BookActionTypes.SearchBooks;
    constructor(public payload: BookFilter) { }
}

export type CollectionActionsUnion =
    | Load
    | LoadSuccess
    | View
    | ViewSuccess
    | Edit
    | EditSuccess
    | Delete
    | DeleteSuccess
    | PaginationEvent
    | PaginationEventSuccess
    | SearchBooks;
