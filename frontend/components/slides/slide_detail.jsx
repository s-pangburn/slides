import React from 'react';
import markdown from '../../util/markdown';

const SlideDetail = ({slide, selected, onClick}) => (
  <div className={selected ? "markdown slide selected" : "markdown slide"}
       dangerouslySetInnerHTML={{__html: markdown.render(slide.markdown)}}
       onClick={onClick} />
);

export default SlideDetail;
