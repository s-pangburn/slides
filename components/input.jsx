import React from 'react';
import Remarkable from 'remarkable';
const hljs = require('highlightjs');

const md = new Remarkable({
  html:         false,        // Enable HTML tags in source
  xhtmlOut:     false,        // Use '/' to close single tags (&lt;br /&gt;)
  breaks:       false,        // Convert '\n' in paragraphs into &lt;br&gt;
  langPrefix:   'language-',  // CSS language prefix for fenced blocks
  linkify:      true,         // autoconvert URL-like texts to links
  linkTarget:   '',           // set target to open link in

  // Enable some language-neutral replacements + quotes beautification
  typographer:  false,

  // Double + single quotes replacement pairs, when typographer enabled,
  // and smartquotes on. Set doubles to '«»' for Russian, '„“' for German.
  quotes: '“”‘’',

  // Highlighter function. Should return escaped HTML,
  // or '' if input not changed
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
      } catch (__) {}
    }

    try {
      return hljs.highlightAuto(str).value;
    } catch (__) {}

    return ''; // use external default escaping
  }
});



class Input extends React.Component {
  constructor() {
    super();
    this._updateText = this._updateText.bind(this);
    this.rawMarkup = this.rawMarkup.bind(this);

    this.state = { slides: [], currentSlide: 0 };
  }

  _updateText(e) {
    e.preventDefault();
    this.setState({ slides: e.currentTarget.value.split("---") }, this._updateCurrentSlide);
    //this.setState({ markdown: e.currentTarget.value });
  }

  _updateCurrentSlide() {
    const cursorLocation = document.querySelector('textarea').selectionEnd;
    //const slides = this.state.markdown.split("---")[this.state.currentSlide];
    let charCount = 0;

    for(let i = 0; i < this.state.slides.length; i++) {
      if(cursorLocation <= (charCount + this.state.slides[i].length)) {
        this.setState({ currentSlide: i });
        return;
      } else {
        // adding 3 to account for '---' lost in split
        charCount += (this.state.slides[i].length + 3);
      }
    }
  }

  rawMarkup() {
    //const slide = this.state.markdown.split("---")[this.state.currentSlide];
    return { __html: md.render(this.state.slides[this.state.currentSlide]) };
  }

  render() {
    console.log(`currentSlid: ${this.state.currentSlide}`);
    return (
      <div className="input-container">
        <textarea onChange={this._updateText} onClick={this._updateText}/>
        <div className="render-container">
          <div className="render-preview" dangerouslySetInnerHTML={this.rawMarkup()}/>
        </div>
      </div>
    )
  }
}

export default Input;

