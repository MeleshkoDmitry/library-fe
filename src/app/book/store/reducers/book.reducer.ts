import { Action, createFeatureSelector, createSelector } from '@ngrx/store';

export interface CustomAction extends Action {
    type: string;
    payload: any;
}

const initialState = {
    list: { items: {}, pagination: { page: 1, pageSize: 5 }, filter: {} },
    view: { book: { _id: null, title: null, author: null } },
    edit: { book: { _id: null, title: null, author: null } }
};

export function booksReducer(state = initialState, action: CustomAction) {
    switch (action.type) {
        case 'VIEW_LIST_BOOKS_SUCCESS':
            return Object.assign({}, state, {
                list: Object.assign({}, state.list, { items: action.payload })
            });
        case 'VIEW_BOOK_SUCCESS':
            return Object.assign({}, state, {
                view: Object.assign({}, state.view, { book: action.payload })
            });
        case 'EDIT_BOOK_SUCCESS':
            return Object.assign({}, state, {
                edit: Object.assign({}, state.edit, { book: action.payload })
            });
        case 'SEARCH_BOOKS':
            return Object.assign({}, state, {
                list: Object.assign({}, state.list, { filter: action.payload })
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
        case 'RESET':
            return Object.assign({}, state, state.list.pagination.page = 1,
                state.list.pagination.pageSize);
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

export const selectEdit = createSelector(selectFeature, (state: IBooksState) => state.edit);
export const selectEditBook = createSelector(selectEdit, (state: any) => state.book);
