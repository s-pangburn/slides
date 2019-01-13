import {
  RECEIVE_STATE
} from '../actions';

const slidesReducer = (state = [], action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_STATE:
      return [];
    default:
      return state;
  }
};

export default slidesReducer;
