import { Action, createFeatureSelector, createSelector } from '@ngrx/store';
import { Book, Pagination, BookFilter, IBookListItems } from '../../book';
import { BookActionTypes, BooksActionsUnion } from '../actions/books-actions';

export interface IBookListStateQuery {
    pagination: Pagination;
    filter: BookFilter;
    firstLoad: boolean;
}
interface IBookListState {
    items: IBookListItems;
    query: IBookListStateQuery;
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
    items: { books: [], totalRecords: 0 },
    query: {
        firstLoad: true,
        pagination: { page: 1, pageSize: 10 },
        filter: { title: '', author: '' },
    },
    delete: false,
};
const initialSingleBook: ISingleBookState = {
    book: { _id: null, title: null, author: null }
};

export function listReducer(state: IBookListState = initialListState, action: BooksActionsUnion) {
    switch (action.type) {
        case BookActionTypes.LoadBooksSuccess:
            return {
                ...state,
                items: action.payload,
                delete: false,
            };
        case BookActionTypes.PaginationAction:
            return {
                ...state,
                query: {
                    ...state.query,
                    pagination: action.payload
                }
            };
        case BookActionTypes.SearchBooks:
            return {
                ...state,
                query: {
                    ...state.query,
                    pagination: {
                        ...state.query.pagination,
                        page: 1
                    },
                    filter: action.payload
                }
            };
        case BookActionTypes.QuerySearchBooks:
            return {
                ...state,
                query: {
                    ...state.query,
                    filter: action.payload,
                    firstLoad: false
                }
            };
        case BookActionTypes.DeleteSuccess:
            return {
                ...state,
                delete: true
            };
        default:
            return state;
    }
}

export function viewReducer(state: ISingleBookState = initialSingleBook, action: BooksActionsUnion) {
    switch (action.type) {
        case BookActionTypes.ViewSuccess:
            return { ...state, book: action.payload };
        default:
            return state;
    }
}

export function editReducer(state: ISingleBookState = initialSingleBook, action: BooksActionsUnion) {
    switch (action.type) {
        case BookActionTypes.EditSuccess:
            return { ...state, book: action.payload };
        default:
            return state;
    }
}

export const reducers = {
    list: listReducer,
    view: viewReducer,
    edit: editReducer
};

export const selectFeature = createFeatureSelector<IBooksState>('book');

export const selectList = createSelector(selectFeature, (state: IBooksState) => state.list);
export const selectListBooks = createSelector(selectList, (state: IBookListState) => state.items);
export const selectListDelete = createSelector(selectList, (state: IBookListState) => state.delete);

export const selectListQuery = createSelector(selectList, (state: IBookListState) => state.query);
export const selectListQueryPagination = createSelector(selectListQuery, (state: IBookListStateQuery) => state.pagination);
export const selectListQueryFilter = createSelector(selectListQuery, (state: IBookListStateQuery) => state.filter);

export const selectView = createSelector(selectFeature, (state: IBooksState) => state.view);
export const selectViewBook = createSelector(selectView, (state: ISingleBookState) => state.book);

export const selectEdit = createSelector(selectFeature, (state: IBooksState) => state.edit);
export const selectEditBook = createSelector(selectEdit, (state: ISingleBookState) => state.book);
