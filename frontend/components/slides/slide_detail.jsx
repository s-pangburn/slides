import React from 'react';
import markdown from '../../util/markdown';

const SlideDetail = ({slide, selected, onClick}) => (
  <div className={selected ? "slide selected" : "slide"}
       dangerouslySetInnerHTML={{__html: markdown.render(slide.markdown)}}
       onClick={onClick} />
);

export default SlideDetail;
