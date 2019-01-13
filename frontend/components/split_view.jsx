import React from 'react';
import EditViewContainer from './edit/edit_view_container';
import PresentViewContainer from './present/present_view_container';

const SplitView = (props) => (
  <div className="input-container">
    <EditViewContainer />
    <PresentViewContainer />
  </div>
);

export default SplitView;
