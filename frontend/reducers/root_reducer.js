import {
  RECEIVE_STATE,
  UPDATE_TEXT,
  UPDATE_SLIDE_INDEX
} from '../actions';
import slidesReducer from './slides_reducer';
import demoText from '../util/demo_text';
import { parseSlides } from '../util/slides';

const defaultState = {
  text: demoText,
  slides: parseSlides(demoText),
  slideIndex: 0
};

export default (state = defaultState, action) => {
  Object.freeze(state);

  switch (action.type) {

    case RECEIVE_STATE:
      const {text, slideIndex} = action;
      return {
        text,
        slides: slidesReducer(state.slides, action),
        slideIndex
      };

    case UPDATE_TEXT:
      return Object.assign({}, state, {
        text: action.text,
        slides: slidesReducer(state.slides, action)
      });

    case UPDATE_SLIDE_INDEX:
      return Object.assign({}, state, {slideIndex: parseInt(action.slideIndex)});

    default:
      return state;
  }
};
