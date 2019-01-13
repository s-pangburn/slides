import { combineReducers } from 'redux';

import textReducer from './text_reducer';
import slidesReducer from './slides_reducer';
import indicesReducer from './indices_reducer';

export default combineReducers({
  text: textReducer,
  slides: slidesReducer,
  indices: indicesReducer
});
