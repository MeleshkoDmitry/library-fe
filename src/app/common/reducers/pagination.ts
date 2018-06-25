import { Action } from '@ngrx/store';
export interface CustomAction extends Action {
    type: string;
    pageSize?: number;
}
export interface AppState {
    pagination: any;
}

export function pageReducer(state = { prevState: 1, currentState: 1, pageSize: 5 }, action: CustomAction) {
    switch (action.type) {
        case 'INCREMENT':
            return { prevState: state.currentState, currentState: state.currentState + 1, pageSize: state.pageSize };
        case 'DECREMENT':
            return { prevState: state.currentState, currentState: state.currentState - 1, pageSize: state.pageSize };
        case 'PAGE_SIZE':
            return { prevState: state.currentState, currentState: 1, pageSize: action.pageSize };
        default:
            return state;
    }
}
