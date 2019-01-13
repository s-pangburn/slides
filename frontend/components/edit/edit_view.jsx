import React from 'react';
import { Link } from 'react-router-dom';
const CodeMirror = require('react-codemirror');
require('codemirror/mode/markdown/markdown');

class EditView extends React.Component {

  resetInput(e) {
    e.preventDefault();
    this.props.updateText('');
  }

  renderCodeMirror() {
    return (
      <CodeMirror
        ref="editor"
        value={this.props.text}
        onChange={this.props.updateText}
        options={{
          theme: 'base16-dark',
          lineNumbers: true,
          mode: 'markdown',
          autoSave: true,
          tabSize: 2,
          lineWrapping: true }}/>
    );
  }

  render() {
    return (
      <div>
        <header>
          <div>
            <i className="fa fa-trash-o"
                onClick={this.resetInput.bind(this)}
                aria-hidden="true"></i>
            <a href="https://github.com/appacademy/slides">
              <i className="fa fa-github" aria-hidden="true"></i>
            </a>
          </div>
          <Link className="header" to="/present">Present</Link>
        </header>
        <div className="codemirror-container" >
          {this.renderCodeMirror()}
        </div>
      </div>
    );
  }
}

export default EditView;
