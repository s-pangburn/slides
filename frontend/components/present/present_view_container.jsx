import { connect } from 'react-redux';

import PresentView from './present_view';
import { receiveState } from '../../actions';

const mapStateToProps = ({ slides, indices: {slideIndex} }) => ({slides, slideIndex});

const mapDispatchToProps = dispatch => ({
  updateSlideIndex: (slideIndex) => receiveState({slideIndex})
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PresentView);
