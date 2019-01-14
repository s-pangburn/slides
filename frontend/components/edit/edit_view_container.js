import { connect } from 'react-redux';

import EditView from './edit_view';
import { updateText, resetState } from '../../actions';

const mapStateToProps = ({ text }) => ({ text });

const mapDispatchToProps = dispatch => ({
  updateText: (text) => dispatch(updateText(text)),
  resetState: () => dispatch(resetState())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditView);
