import React from 'react';
import ReactCSSTransitionReplace from 'react-css-transition-replace';
import Progress from 'react-progressbar';
import SlideDetail from '../slides/slide_detail';

class PresentView extends React.Component {
  constructor(props) {
    super(props);
    this.toggleSlide = this.toggleSlide.bind(this);
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
    const slideIndex = this.props.slideIndex;

    switch (e.key) {
      case "PageUp":
      case "ArrowLeft":
        console.log('left', slideIndex);
        if (slideIndex > 0) {
          this.props.updateSlideIndex(slideIndex - 1);
        }
        break;

      case "PageDown":
      case "ArrowRight":
        console.log('right', slideIndex);
        if (slideIndex < this.props.slides.length - 1) {
          this.props.updateSlideIndex(slideIndex + 1);
        }
        break;
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
        <Progress completed={progress} color="darkseagreen" height={5}/>
      </div>
    );
  }
}

export default PresentView;
