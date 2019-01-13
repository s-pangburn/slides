import { connect } from 'react-redux';

import EditView from './edit_view';
import { receiveState } from '../../actions';

const mapStateToProps = ({ text, indices: {textIndex} }) => ({text, textIndex});

const mapDispatchToProps = dispatch => ({
  updateText: (text) => receiveState({text})
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditView);
