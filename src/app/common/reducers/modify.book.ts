import { Action } from '@ngrx/store';
import { Book } from '../../book/book';

export interface CustomAction extends Action {
    type: string;
    book: any;
    listBooks: any;
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

export function ModifyBookReducer(state = initState, action: CustomAction) {
    switch (action.type) {
        case 'VIEW_BOOK':
            return state = action.book;
        case 'EDIT_BOOK':
            return state = action.book;
        default:
            return state;
    }
}

export function ViewListBooks(state = [], action: CustomAction) {
    switch (action.type) {
        case 'VIEW_LIST_BOOKS':
            return state = action.listBooks;
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
