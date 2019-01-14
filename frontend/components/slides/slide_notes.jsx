import React from 'react';
import markdown from '../../util/markdown';

const SlideNotes = ({slide}) => (
  <div className="markdown slide-notes"
       dangerouslySetInnerHTML={{__html: markdown.render(slide.notes)}} />
);

export default SlideNotes;
