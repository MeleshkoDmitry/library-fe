import { Action } from '@ngrx/store';
import { Book } from '../../book/book';

export interface CustomAction extends Action {
    type: string;
    payload: any;
    book: any;
    searchBooks: any;
}

export interface AppState {
    pageCount: any;
    book: Book;
}

const initState: Book = {
    _id: null,
    title: null,
    author: null
};

export function LoadBooks(state = [], action: CustomAction) {
    switch (action.type) {
        case 'VIEW_LIST_BOOKS_SUCCESS':
            return state = action.payload;
        case 'VIEW_LIST_BOOKS_FAILED':
            return state;
        default:
            return state;
    }
}

export function ModifyBook(state = initState, action: CustomAction) {
    switch (action.type) {
        case 'VIEW_BOOK_SUCCESS':
            return state = action.payload;
        case 'VIEW_BOOK_FAILED':
            return state;
        case 'EDIT_BOOK_SUCCESS':
            return state = action.payload;
        case 'EDIT_BOOK_FAILED':
            return state;
        default:
            return state;
    }
}

export function SearchBooks(state = { title: '', author: '' }, action: CustomAction) {
    switch (action.type) {
        case 'SEARCH_BOOKS':
            return { title: action.searchBooks.title, author: action.searchBooks.author };
        default:
            return state;
    }
}
