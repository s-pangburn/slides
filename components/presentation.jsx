import React from 'react';
import ReactCSSTransitionReplace from 'react-css-transition-replace';
import Progress from 'react-progressbar';

class Presentation extends React.Component {
  constructor(props) {
    super(props);
    const slides = this.generateSlides();
    this.toggleSlide = this.toggleSlide.bind(this);

    this.state = { currentSlide: 0, slides };
  }

  componentDidMount() {
    document.addEventListener('keydown', this.toggleSlide);
  }

  generateSlides() {
    const slides = this.props.slides.map((slide, i) => {
      const rawMarkup =  this.props.md.render(slide);
      const progress = Math.round((i + 1) / this.props.slides.length * 100);
      return (
        <div key={i} className="present-slide render-preview" dangerouslySetInnerHTML={{ __html: rawMarkup }} />
      );
    });

    return slides;
  }

  rawMarkup() {
    return { __html: this.props.md.render(this.props.slides[this.state.currentSlide]) };
  }

  toggleSlide(e) {
    const currentSlide = this.state.currentSlide;
    
    if(e.key === "ArrowRight" && currentSlide < this.props.slides.length - 1) {
      e.preventDefault();
      this.setState({ currentSlide: currentSlide + 1 });
    } else if(e.key === "ArrowLeft" && currentSlide > 0) {
      e.preventDefault();
      this.setState({ currentSlide: currentSlide - 1 });
    } else if(e.key === "Escape") {
      e.preventDefault();
      this.props.togglePresent(e);
    }
  }

  render() {
    const progress = Math.round((this.state.currentSlide + 1) / this.props.slides.length * 100);

    return (
      <div className="present-container"> 
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

