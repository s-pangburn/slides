import React from 'react';
import ReactCSSTransitionReplace from 'react-css-transition-replace';
import Progress from 'react-progressbar';
import SlideIndex from '../slides/slide_index';
import SlideDetail from '../slides/slide_detail';

class PresentView extends SlideIndex {
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
