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
      case 'Loading user info success':
        state = {...state, userInfo: state['userInfo'] ? {...state['userInfo'], ...action['payloads']} : action['payloads'], userAuth: true}
        break
      case 'Logging into Rongcloud IM success':
        state = {...state, userRongAuth: true, userRongObj: action['payloads'].im}
        break
      default:
        break
    }

    console.log(state, 'state')
    console.log(action, 'action')
 
    return reducer(state, action);
  };
}

export interface State {

}

export const reducers: ActionReducerMap<State> = {

};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [userInfo] : [];
