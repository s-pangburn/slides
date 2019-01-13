import React from 'react';
import { Link } from 'react-router-dom';
import {Controlled as CodeMirror} from 'react-codemirror2';
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
        onBeforeChange={
          (editor, data, value) => this.props.updateText(value)}
        options={{
          theme: 'base16-dark',
          lineNumbers: true,
          mode: 'markdown',
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
          <Link className="header" to="/present" target="_blank">Present</Link>
        </header>
        <div className="codemirror-container" >
          {this.renderCodeMirror()}
        </div>
      </div>
    );
  }
}

export default EditView;
