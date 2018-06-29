import { Action, createFeatureSelector, createSelector, State, ActionReducerMap, ActionReducer } from '@ngrx/store';
import { Book } from '../../book/book';
import { pageReducer } from './pagination.reducer';

export interface CustomAction extends Action {
    type: string;
    payload: any;
}

export interface AppState {
    pageCount: any;
    book: Book;
}

export function booksReducer(state = {}, action: CustomAction) {
    switch (action.type) {
        case 'VIEW_LIST_BOOKS_SUCCESS':
            return Object.assign({}, state, { books: action.payload });
        default:
            return state;
    }
}


export function viewBook(state = {}, action: CustomAction) {
    switch (action.type) {
        case 'VIEW_BOOK_SUCCESS':
            return Object.assign({}, state, { book: action.payload });
        default:
            return state;
    }
}

export function editBook(state = {}, action: CustomAction) {
    switch (action.type) {
        case 'EDIT_BOOK_SUCCESS':
            return Object.assign({}, state, { book: action.payload });
        default:
            return state;
    }
}

export const selectFeature = createFeatureSelector<IBooksState>('books');

export const selectList = createSelector(selectFeature, (state: IBooksState) => state.list);
export const selectListBooks = createSelector(selectList, (state: any) => state.books);
export const selectListPagination = createSelector(selectList, (state: any) => state.pagination);

export const selectView = createSelector(selectFeature, (state: IBooksState) => state.view);
export const selectViewBook = createSelector(selectView, (state: any) => state.book);

export interface IBooksState {
    list: any;
    view: any;
    edit: any;
    pagination: any;
}

export const reducers: ActionReducerMap<IBooksState> = {
    list: booksReducer,
    view: viewBook,
    edit: editBook,
    pagination: pageReducer
};

/* export function SearchBooks(state = { title: '', author: '' }, action: CustomAction) {
    switch (action.type) {
        case 'SEARCH_BOOKS':
            return { title: action.searchBooks.title, author: action.searchBooks.author };
        default:
            return state;
    }
} */
