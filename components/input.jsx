import React from 'react';
import Remarkable from 'remarkable';
// import Highlight from 'highlight.js';
var hljs = require('highlight.js');
window.hljs = hljs;

// const md = new Remarkable({
//   highlight: function (str, lang) {
//     if (lang && hljs.getLanguage(lang)) {
//       try {
//         return hljs.highlight(lang, str).value;
//       } catch (err) {}
//     }
//
//     try {
//       return hljs.highlightAuto(str).value;
//     } catch (err) {}
//
//     return ''; // use external default escaping
//   }
// });

var md = new Remarkable('full', {
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

    this.state = { markdown: "", html: "" };
  }

  _updateText(e) {
    e.preventDefault();
    this.setState({ markdown: e.currentTarget.value });
  }

  rawMarkup() {
    debugger
    return { __html: md.render(this.state.markdown) };
  }

  render() {
    return (
      <div className="input-container">
        <textarea onChange={this._updateText}/>
        <div className="render-preview" dangerouslySetInnerHTML={this.rawMarkup()}>
        </div>
      </div>
    )
  }
}

export default Input;

// <div className="render-preview" dangerouslySetInnerHTML={{__html: this.state.html}}>


// # My header
// * A bullet point
// * Another bullet point
//
// ### Smaller Header
//
// **bold text**
//
// *italic text*
