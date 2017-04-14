import React from 'react';

class Presentation extends React.Component {
  constructor(props) {
    super(props);
    this._toggleSlide = this._toggleSlide.bind(this);

    this.state = { currentSlide: 0 };
  }

  componentDidMount() {
    document.addEventListener('keydown', this._toggleSlide);
  }

  rawMarkup() {
    return { __html: this.props.md.render(this.props.slides[this.state.currentSlide]) };
  }

  _toggleSlide(e) {
    const currentSlide = this.state.currentSlide;

    if(e.key === "ArrowRight" && currentSlide < this.props.slides.length - 1) {
      e.preventDefault();
      this.setState({ currentSlide: currentSlide + 1 });
    } else if (e.key === "ArrowLeft" && currentSlide > 0) {
      e.preventDefault();
      this.setState({ currentSlide: currentSlide - 1 });
    } 
  }

  render() {
    const progress = Math.round((this.state.currentSlide + 1) / this.props.slides.length * 100);
    const progressString = `${progress}%`;

   debugger; 

    return (
      <div className="present-container">
        <div className="present-slide render-preview" dangerouslySetInnerHTML={this.rawMarkup()}/>
        <div className="present-progress" style={{ width: progressString }}/>
      </div>
    );
  }
}

export default Presentation;
