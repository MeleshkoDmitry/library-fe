import { Action, createFeatureSelector, createSelector } from '@ngrx/store';

export interface CustomAction extends Action {
    type: string;
    payload: any;
}

const initialState = {
    list: { items: {}, pagination: { page: 1, pageSize: 5 }, filter: {} },
    view: { book: {} }
};

export function booksReducer(state = initialState, action: CustomAction) {
    switch (action.type) {
        case 'VIEW_LIST_BOOKS_SUCCESS':
            return Object.assign({}, state, {
                list: Object.assign({}, state.list, { items: action.payload })
            });
        case 'SEARCH_BOOKS':
        console.log(action);
            return Object.assign({}, state, {
                list: Object.assign({}, state.list, { filter: action.payload })
            });
        case 'VIEW_BOOK_SUCCESS':
            return Object.assign({}, state, {
                view: Object.assign({}, state.view, { book: action.payload })
            });
        case 'INCREMENT':
            return Object.assign({}, state, state.list.pagination.page++,
                state.list.pagination.pageSize);
        case 'DECREMENT':
            return Object.assign({}, state, state.list.pagination.page--,
                state.list.pagination.pageSize);
        case 'PAGE_SIZE':
            return Object.assign({}, state, state.list.pagination.page = 1,
                state.list.pagination.pageSize = +action.payload);
        default:
            return state;
    }
}

export interface IBooksState {
    list: any;
    view: any;
    edit: any;
}

export const selectFeature = createFeatureSelector<IBooksState>('books');

export const selectList = createSelector(selectFeature, (state: IBooksState) => state.list);
export const selectListBooks = createSelector(selectList, (state: any) => state.items);
export const selectListPagination = createSelector(selectList, (state: any) => state.pagination);
export const selectListFilter = createSelector(selectList, (state: any) => state.filter);

export const selectView = createSelector(selectFeature, (state: IBooksState) => state.view);
export const selectViewBook = createSelector(selectView, (state: any) => state.book);



/* export function SearchBooks(state = { title: '', author: '' }, action: CustomAction) {
    switch (action.type) {
        case 'SEARCH_BOOKS':
            return { title: action.searchBooks.title, author: action.searchBooks.author };
        default:
            return state;
    }
} */
