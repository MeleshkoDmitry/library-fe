import { Action, createFeatureSelector, createSelector, ActionReducerMap } from '@ngrx/store';
import { Book, Pagination, BookFilter } from '../../book';

export interface CustomAction extends Action {
    payload: any;
}

interface IBookListState {
    items: Book[];
    pagination: Pagination;
    filter: BookFilter;
    delete: boolean;
}

interface ISingleBookState {
    book: Book;
}

export interface IBooksState {
    list: IBookListState;
    view: ISingleBookState;
    edit: ISingleBookState;
}
const initialListState: IBookListState = {
    items: [],
    pagination: { page: 1, pageSize: 10, totalRecords: 0 },
    filter: { title: null, author: null },
    delete: false
};
const initialSingleBook: ISingleBookState = {
    book: { _id: null, title: null, author: null }
};

export function listReducer(state: IBookListState = initialListState, action: CustomAction) {
    switch (action.type) {
        case 'VIEW_LIST_BOOKS_SUCCESS':
            return Object.assign({}, state, { items: action.payload.books }, { delete: false },
                { pagination: Object.assign({}, state.pagination, { totalRecords: action.payload.totalRecords }) });
        case 'INCREMENT_BOOKS_PAGINATION':
            return Object.assign({}, state, state.pagination.page++,
                state.pagination.pageSize);
        case 'DECREMENT_BOOKS_PAGINATION':
            return Object.assign({}, state, state.pagination.page--,
                state.pagination.pageSize);
        case 'PAGE_SIZE_BOOKS_PAGINATION':
            return Object.assign({}, state, state.pagination.page = 1,
                state.pagination.pageSize = +action.payload);
        case 'RESET_BOOKS_PAGINATION':
            return Object.assign({}, state, state.pagination.page = 1,
                state.pagination.pageSize);
        case 'SEARCH_BOOKS':
            return Object.assign({}, state, { filter: action.payload });
        case 'DELETE_BOOK_SUCCESS':
            return Object.assign({}, state, { delete: true });
        default:
            return state;
    }
}
export function viewReducer(state: ISingleBookState = initialSingleBook, action: CustomAction) {
    switch (action.type) {
        case 'VIEW_BOOK_SUCCESS':
            return Object.assign({}, state, { book: action.payload });
        default:
            return state;
    }
}

export function editReducer(state: ISingleBookState = initialSingleBook, action: CustomAction) {
    switch (action.type) {
        case 'EDIT_BOOK_SUCCESS':
            return Object.assign({}, state, { book: action.payload });
        default:
            return state;
    }
}

export const reducers: ActionReducerMap<IBooksState> = {
    list: listReducer,
    view: viewReducer,
    edit: editReducer
};

export const selectFeature = createFeatureSelector<IBooksState>('book');

export const selectList = createSelector(selectFeature, (state: IBooksState) => state.list);
export const selectListBooks = createSelector(selectList, (state: IBookListState) => state.items);
export const selectDelete = createSelector(selectList, (state: IBookListState) => state.delete);
export const selectListPagination = createSelector(selectList, (state: IBookListState) => state.pagination);
export const selectListFilter = createSelector(selectList, (state: IBookListState) => state.filter);

export const selectView = createSelector(selectFeature, (state: IBooksState) => state.view);
export const selectViewBook = createSelector(selectView, (state: ISingleBookState) => state.book);

export const selectEdit = createSelector(selectFeature, (state: IBooksState) => state.edit);
export const selectEditBook = createSelector(selectEdit, (state: ISingleBookState) => state.book);
