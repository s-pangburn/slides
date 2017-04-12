import React from 'react';

class Presentation extends React.Component {
  constructor(props) {
    super(props);

    this.state = { currentSlide: 0 };
  }

  rawMarkup() {
    return { __html: this.props.md.render(this.props.slides[this.state.currentSlide]) };
  }

  render() {
    debugger;
    return (
      <div className="present-container">
        <div className="present-slide" dangerouslySetInnerHTML={this.rawMarkup()}/>
      </div>
    );
  }
}

export default Presentation;
