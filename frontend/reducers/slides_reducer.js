import {
  RECEIVE_STATE
} from '../actions';

const SLIDE_DELIMITER = /[^-]---[^-]/g;
const NOTE_DELIMITER = "\nNote:";

function parseSlides(text) {
  return text.split(SLIDE_DELIMITER).map(slideText => {
    const parts = slideText.split(NOTE_DELIMITER);
    return {
      markdown: parts[0],
      notes: parts.slice(1).join(NOTE_DELIMITER)
    };
  });
}

const slidesReducer = (state = [], action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_STATE:
      return parseSlides(action.text);
    default:
      return state;
  }
};

export default slidesReducer;
