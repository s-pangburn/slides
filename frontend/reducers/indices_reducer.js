import {
  RECEIVE_STATE
} from '../actions';

const defaultState = {
  textIndex: 0,
  slideIndex: 0
};

const indicesReducer = (state = defaultState, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_STATE:
      const {textIndex, slideIndex} = action;
      return {textIndex, slideIndex};
    default:
      return state;
  }
};

export default indicesReducer;
