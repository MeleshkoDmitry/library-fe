import { Action, createFeatureSelector, createSelector, ActionReducerMap } from '@ngrx/store';
import { Book, Pagination, BookFilter } from '../../book';
import { BookActionTypes } from '../actions/actions';

export interface CustomAction extends Action {
    payload: any;
}

export interface IBookListStateQuery {
    pagination: Pagination;
    filter: BookFilter;
}
interface IBookListState {
    items: Book[];
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
    items: [],
    query: {
        pagination: { page: 1, pageSize: 10, totalRecords: 0 },
        filter: { title: null, author: null },
    },
    delete: false
};
const initialSingleBook: ISingleBookState = {
    book: { _id: null, title: null, author: null }
};

export function listReducer(state: IBookListState = initialListState, action: CustomAction) {
    switch (action.type) {
        case BookActionTypes.LoadSuccess:
            return Object.assign({}, state, { items: action.payload.books }, { delete: false }, {
                query: Object.assign({}, state.query, {
                    pagination: Object.assign({}, state.query.pagination,
                        { totalRecords: action.payload.totalRecords })
                })
            });
        case BookActionTypes.PaginationEventSuccess:
            return Object.assign({}, state, {
                query: Object.assign({}, state.query, {
                    pagination: Object.assign({}, state.query.pagination,
                        { page: action.payload.page, pageSize: action.payload.pageSize })
                })
            });
        case BookActionTypes.SearchBooks:
            return Object.assign({}, state, {
                pagination: Object.assign({}, state.query.pagination, { page: 1 })
            }, {
                query: Object.assign({}, state.query, { filter: action.payload }, )
                });
        case BookActionTypes.DeleteSuccess:
            return Object.assign({}, state, { delete: true });
        default:
            return state;
    }
}
export function viewReducer(state: ISingleBookState = initialSingleBook, action: CustomAction) {
    switch (action.type) {
        case BookActionTypes.ViewSuccess:
            return Object.assign({}, state, { book: action.payload });
        default:
            return state;
    }
}

export function editReducer(state: ISingleBookState = initialSingleBook, action: CustomAction) {
    switch (action.type) {
        case BookActionTypes.EditSuccess:
            return Object.assign({}, state, { book: action.payload });
        default:
            return state;
    }
}

export const selectFeature = createFeatureSelector<IBooksState>('book');

export const selectList = createSelector(selectFeature, (state: IBooksState) => state.list);
export const selectListBooks = createSelector(selectList, (state: IBookListState) => state.items);
export const selectDelete = createSelector(selectList, (state: IBookListState) => state.delete);

export const selectListQuery = createSelector(selectList, (state: IBookListState) => state.query);
export const selectListQueryPagination = createSelector(selectListQuery, (state: IBookListStateQuery) => state.pagination);
export const selectListQueryFilter = createSelector(selectListQuery, (state: IBookListStateQuery) => state.filter);

export const selectView = createSelector(selectFeature, (state: IBooksState) => state.view);
export const selectViewBook = createSelector(selectView, (state: ISingleBookState) => state.book);

export const selectEdit = createSelector(selectFeature, (state: IBooksState) => state.edit);
export const selectEditBook = createSelector(selectEdit, (state: ISingleBookState) => state.book);

export const reducers: ActionReducerMap<IBooksState> = {
    list: listReducer,
    view: viewReducer,
    edit: editReducer
};
