import React from 'react';
import ReactCSSTransitionReplace from 'react-css-transition-replace';
import Progress from 'react-progressbar';
import SlideDetail from '../slides/slide_detail';

class SlideIndex extends React.Component {
  constructor(props) {
    super(props);

    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.slideLeft = this.slideLeft.bind(this);
    this.slideRight = this.slideRight.bind(this);
  }

  currentSlide() {
    return this.props.slides[this.props.slideIndex];
  }

  handleKeyPress(e) {
    switch (e.key) {
      case "PageUp":
      case "ArrowUp":
      case "ArrowLeft":
        e.preventDefault();
        this.slideLeft();
        break;

      case "PageDown":
      case "ArrowDown":
      case "ArrowRight":
        e.preventDefault();
        this.slideRight();
        break;
    }
  }

  slideLeft() {
    if (this.props.slideIndex > 0) {
      this.props.updateSlideIndex(this.props.slideIndex - 1);
    }
  }

  slideRight() {
    if (this.props.slideIndex < this.props.slides.length - 1) {
      this.props.updateSlideIndex(this.props.slideIndex + 1);
    }
  }

  render() {
    return (
      <div className="slide-index" onKeyDown={this.handleKeyPress}>
        {this.props.slides.map((slide, i) => (
          <SlideDetail
            key={i} slide={slide}
            selected={i === this.props.slideIndex}
            onClick={this.props.updateSlideIndex.bind(null, i)} />
        ))}
      </div>
    );
  }
}

export default SlideIndex;
