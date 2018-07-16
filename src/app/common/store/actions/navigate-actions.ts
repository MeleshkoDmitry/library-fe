import { Action } from '@ngrx/store';
import { NavigationExtras } from '@angular/router';

export enum RouterActionTypes {
  GO = '[Router] Go',
  BACK = '[Router] Back',
  FORWARD = '[Router] Forward'

}


export class Back implements Action {
  readonly type = RouterActionTypes.BACK;
}

export class Forward implements Action {
  readonly type = RouterActionTypes.FORWARD;
}

export class Go implements Action {
  readonly type = RouterActionTypes.GO;

  constructor(
    public payload: {
      path: any[];
      query?: string;
      extras?: NavigationExtras;
    }
  ) { }
}
export type RouterActionsUnion = Go | Back | Forward;
