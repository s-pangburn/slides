import React from 'react';
import SlideDisplay from './slide_display';
import SlideDetail from './slide_detail';
import SlideNotes from './slide_notes';

class SlideIndex extends SlideDisplay {
  componentDidMount() {
    super.componentDidMount();
    this.scroll(this.props);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.slideIndex === this.props.slideIndex) return;
    this.scroll(newProps);
  }

  scroll({ slides, slideIndex }) {
    const slidesEl = this.refs.slides;
    console.log(slidesEl);
    if (!slidesEl) return;

    const pos = slideIndex / slides.length * slidesEl.scrollHeight;
    console.log(pos);
    slidesEl.scrollTo(0, pos);
  }

  render() {
    return (
      <div className="slide-index" onKeyDown={this.handleKeyPress}>
        <ul className="slides" ref="slides">
          {this.props.slides.map((slide, i) => (
            <SlideDetail
              key={i} slide={slide}
              selected={i === this.props.slideIndex}
              onClick={this.props.updateSlideIndex.bind(null, i)} />
          ))}
        </ul>
        <SlideNotes slide={this.currentSlide()} />
      </div>
    );
  }
}

export default SlideIndex;
