import React from 'react';
import Remarkable from 'remarkable';
import hljs from 'highlightjs';
import { Link } from 'react-router-dom';
import Presentation from './presentation';

class Edit extends React.Component {
  constructor() {
    super();
    this.updateText = this.updateText.bind(this);
    this.togglePresent = this.togglePresent.bind(this);
    this.rawMarkup = this.rawMarkup.bind(this);
    this.resetInput = this.resetInput.bind(this);

    const input = window.localStorage.input || demoText;
    const slides = input.split("---");
    this.state = { input, slides, currentSlide: 0, present: false };
  }

  updateText(e) {
    e.preventDefault();

    window.localStorage.input = e.currentTarget.value;
    this.setState({ 
      input: e.currentTarget.value, 
      slides: e.currentTarget.value.split("---") }, this.updateCurrentSlide);
  }

  updateCurrentSlide() {
    const cursorLocation = document.querySelector('textarea').selectionEnd;
    let charCount = 0;

    for(let i = 0; i < this.state.slides.length; i++) {
      if(cursorLocation <= (charCount + this.state.slides[i].length)) {
        this.setState({ currentSlide: i });
        return;
      } else {
        // add 3 to account for '---' lost in split
        charCount += (this.state.slides[i].length + 3);
      }
    }
  }

  togglePresent(e) {
    e.preventDefault();

    this.setState({ present: !this.state.present });
  }

  rawMarkup() {
    return { __html: md.render(this.state.slides[this.state.currentSlide]) };
  }

  resetInput(e) {
    e.preventDefault();

    window.localStorage.clear();
    this.setState({ input: "", slides: [], currentSlide: 0 });
  }

  render() {
    let content;

    if(!this.state.present) {
      content = (
        <div className="input-container">
          <header>
            <i className="fa fa-trash-o" onClick={this.resetInput} aria-hidden="true"></i>
            <div className="header" onClick={this.togglePresent}>Present</div>
          </header>
          <textarea className="markdown" value={this.state.input} onChange={this.updateText} onClick={this.updateText}/>
          <div className="render-container">
            <div className="render-preview" dangerouslySetInnerHTML={this.rawMarkup()}/>
          </div>
        </div>
      );
    } else {  
      content = <Presentation slides={this.state.slides} md={md} togglePresent={this.togglePresent}/>; 
    }
    
    return content;
  }
}

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

const demoText = `
# Markdown Slides 

---

# Code Snippets And Blocks 

* Supports single line code \`snippets\` with backticks
* Or, use multi-line code blocks with automatic syntax highlighting:

\`\`\`js
for(let i = 0; i < 10; i++) {
  console.log('hello world!');
}
\`\`\`

---

# Presenting 

* Click 'Present' in navbar 
  * Use arrow keys to navigate through slides
  * Press \`escape\` to switch back to 'edit' mode
* Slides will be persisted even if you navigate away from site

--- 

# Real-Time Preview

#### Click around to see selected slide render 
`;

export default Edit;
