import {
  RECEIVE_STATE
} from '../actions';
import demoText from '../util/demo_text';

const textReducer = (state = demoText, action) => {
  switch (action.type) {
    case RECEIVE_STATE:
      return action.text;
    default:
      return state;
  }
};

export default textReducer;
