import { Action } from '@ngrx/store';
import { NavigationExtras } from '@angular/router';

export enum BookActionTypes {
  GO = '[Router] Go',
  BACK = '[Router] Back',
  FORWARD = '[Router] Forward'

}


export class Back implements Action {
  readonly type = BookActionTypes.BACK;
}

export class Forward implements Action {
  readonly type = BookActionTypes.FORWARD;
}

export class Go implements Action {
  readonly type = BookActionTypes.GO;

  constructor(
    public payload: {
      path: any[];
      query?: object;
      extras?: NavigationExtras;
    }
  ) { }
}
export type RouterActionsUnion = Go | Back | Forward;
