import Types from '../actions/types';

const defaultState = {
  contactsArr: [],
  arrRefreshing: false,
  contactsLoading: false,
};

export default function onAction(state = defaultState, action) {
  switch (action.type) {
    case Types.CONTACTS_ARR_CHANGE:
      return {
        ...state,
        contactsArr: action.contactsArr,
        arrRefreshing: action.arrRefreshing,
      };
    case Types.CONTACTS_ARR_LOADING_CHANGE:
      return {
        ...state,
        arrRefreshing: action.arrRefreshing,
      };
    case Types.CONTACTS_LOADING_CHANGE:
      return {
        ...state,
        contactsLoading: action.contactsLoading,
      };
    default:
      return state;
  }
}
