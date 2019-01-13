export const RECEIVE_STATE = 'RECEIVE_STATE';

export const receiveState = ({text, textIndex, slideIndex}) => ({
  type: RECEIVE_STATE,
  text,
  textIndex,
  slideIndex
});
