import React from 'react';
import SlideDisplay from './slide_display';
import SlideDetail from './slide_detail';
import SlideNotes from './slide_notes';
import { withRouter } from "react-router";

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
    if (!slidesEl) return;

    const pos = slideIndex / slides.length * slidesEl.scrollHeight;
    slidesEl.scrollTo(0, pos);
  }

  handleKeyPress(e) {
    const superResult = super.handleKeyPress(e);
    if (superResult) { return superResult; }

    switch (e.key) {
      case "F5":
        e.preventDefault();
        this.props.history.push('/present');
    }
  }

  render() {
    return (
      <div className="slide-index" onKeyDown={this.handleKeyPress}>
        <div className="slides" ref="slides">
          {this.props.slides.map((slide, i) => (
            <SlideDetail
              key={i} slide={slide}
              selected={i === this.props.slideIndex}
              onClick={this.props.updateSlideIndex.bind(null, i)} />
          ))}
        </div>
        <SlideNotes slide={this.currentSlide()} />
      </div>
    );
  }
}

export default withRouter(SlideIndex);
