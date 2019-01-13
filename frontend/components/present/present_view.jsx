import React from 'react';
import ReactCSSTransitionReplace from 'react-css-transition-replace';
import Progress from 'react-progressbar';
import SlideDetail from '../slides/slide_detail';

class PresentView extends React.Component {
  constructor(props) {
    super(props);

    this.toggleSlide = this.toggleSlide.bind(this);
    this.slideLeft = this.slideLeft.bind(this);
    this.slideRight = this.slideRight.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.toggleSlide);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.toggleSlide);
  }

  currentSlide() {
    return this.props.slides[this.props.slideIndex];
  }

  toggleSlide(e) {
    switch (e.key) {
      case "PageUp":
      case "ArrowLeft":
        this.slideLeft();
        break;

      case "PageDown":
      case "ArrowRight":
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
    const progress = Math.round(
      (this.props.slideIndex + 1) / this.props.slides.length * 100);

    return (
      <div className="present-container" onKeyDown={this.toggleSlide}>
        <ReactCSSTransitionReplace
          className="present-replace-container"
          transitionName="fade-wait"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}>
          <SlideDetail slide={this.currentSlide()} />
        </ReactCSSTransitionReplace>
        <div className="render-arrows">
          <i className="fa fa-arrow-left"
              onClick={this.slideLeft}
              aria-hidden="true"></i>
          <i className="fa fa-arrow-right"
            onClick={this.slideRight}
            aria-hidden="true"></i>
        </div>
        <Progress completed={progress} color="darkseagreen" height={5}/>
      </div>
    );
  }
}

export default PresentView;
