import * as at from 'constants/actionsTypes';


const initialState = {};

export default function someReducer(state = initialState, action) {
  switch (action.type) {
    case at.SOMEACTIONS: return Object.assign({}, state);
    default:
      return state;
  }
}