import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { AcccountManagementService } from '../account-management.service'
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http'

function userInfo(reducer: ActionReducer<any>): ActionReducer<any> {
  return function(state, action) {
    switch (action.type) {
      case 'Loading user success':
        state = {...state, userInfo: action['payloads'].userInfo, userAuth: true}
        break
      default:
        break
    }
 
    return reducer(state, action);
  };
}

export interface State {

}

export const reducers: ActionReducerMap<State> = {

};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [userInfo] : [];
