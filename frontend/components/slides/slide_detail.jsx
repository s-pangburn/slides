import React from 'react';
import markdown from '../../util/markdown';

const SlideDetail = ({slide}) => (
  <div className="render-preview"
       dangerouslySetInnerHTML={{__html: markdown.render(slide.markdown)}} />
);

export default SlideDetail;
