export const RECEIVE_STATE = 'RECEIVE_STATE';
export const UPDATE_TEXT = 'UPDATE_TEXT';
export const UPDATE_SLIDE_INDEX = 'UPDATE_SLIDE_INDEX';


export const receiveState = ({ text, slideIndex }) => ({
  type: RECEIVE_STATE,
  text,
  slideIndex
});

export const updateText = (text) => ({
  type: UPDATE_TEXT,
  text
});

export const updateSlideIndex = (slideIndex) => ({
  type: UPDATE_SLIDE_INDEX,
  slideIndex
});
