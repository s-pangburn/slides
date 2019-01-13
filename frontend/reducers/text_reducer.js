import {
  RECEIVE_STATE
} from '../actions';

const textReducer = (state = '', action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_STATE:
      return action.text;
    default:
      return state;
  }
};

export default textReducer;
