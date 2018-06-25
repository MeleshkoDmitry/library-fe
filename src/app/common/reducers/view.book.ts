/* import { Action } from '@ngrx/store';
import { Book } from './book/book';



export interface ViewBookAction extends Action {
    type: string;
    book: any;
}

export interface AppState {
    pageCount: any;
    viewBook: Book;
}


const initState: Book = {
    _id: null,
    title: null,
    author: null
};

export const viewBookReducer: Reducer<Book> = (state = initState, action: ViewBookAction) => {
    switch (action.type) {
        case 'VIEW_BOOK':
            return state = action.book;
        default:
            return state;
    }
};
 */
