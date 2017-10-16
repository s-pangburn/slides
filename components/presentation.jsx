import React from 'react';
import ReactCSSTransitionReplace from 'react-css-transition-replace';
import Progress from 'react-progressbar';

class Presentation extends React.Component {
  constructor(props) {
    super(props);
    const slides = this.generateSlides();
    this.toggleSlide = this.toggleSlide.bind(this);

    this.state = { currentSlide: this.props.currentSlide, slides };
  }

  componentDidMount() {
    document.addEventListener('keydown', this.toggleSlide);
  }

  requestFullScreen() {
    var el = document.documentElement;
    var rfs = // for newer Webkit and Firefox
        el.requestFullScreen
        || el.webkitRequestFullScreen
        || el.mozRequestFullScreen
        || el.msRequestFullScreen;
    if (typeof rfs != "undefined" && rfs) {
      rfs.call(el);
    } 
  }

  generateSlides() {
    const slides = this.props.slides.map((slide, i) => {
      const deNotedSlide = this.removeNotes(slide);
      const rawMarkup =  this.props.md.render(deNotedSlide);
      const progress = Math.round((i + 1) / this.props.slides.length * 100);
      return (
        <div key={i} className="present-slide render-preview" dangerouslySetInnerHTML={{ __html: rawMarkup }} />
      );
    });

    return slides;
  }

  removeNotes(slide) {
    return slide.split("\nNote:")[0];
  }

  rawMarkup() {
    return { __html: this.props.md.render(this.props.slides[this.state.currentSlide]) };
  }

  toggleSlide(e) {
    const currentSlide = this.state.currentSlide;
    let prevSlide = false;
    let nextSlide = false;

    switch (e.key) {
      case "PageUp":
      case "ArrowLeft":
        prevSlide = true;
        break;
      case "PageDown":
      case "ArrowRight":
        nextSlide = true;
        break;
      case ".":
        this.requestFullScreen();
        break;
    }

    if(!this.props.presenting()) {
      return;
    } else if (nextSlide && currentSlide < this.props.slides.length - 1) {
      e.preventDefault();
      this.setState({ currentSlide: currentSlide + 1 });
    } else if (prevSlide && currentSlide > 0) {
      e.preventDefault();
      this.setState({ currentSlide: currentSlide - 1 });
    }
  }

  render() {
    const progress = Math.round((this.state.currentSlide + 1) / this.props.slides.length * 100);

    return (
      <div className="present-container" onKeyDown={this.toggleSlide}>
        <ReactCSSTransitionReplace
          className="present-replace-container"
          transitionName="fade-wait"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}>
          { this.state.slides[this.state.currentSlide] }
        </ReactCSSTransitionReplace>
        <Progress completed={progress} color="darkseagreen" height={5}/>
      </div>
    );
  }
}

export default Presentation;

