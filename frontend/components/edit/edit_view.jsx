import React from 'react';
import { Link } from 'react-router-dom';
import { Controlled as CodeMirror } from 'react-codemirror2';
require('codemirror/mode/markdown/markdown');

class EditView extends React.Component {

  renderCodeMirror() {
    return (
      <CodeMirror
        ref="editor"
        value={this.props.text}
        onBeforeChange={
          (_editor, _data, value) => this.props.updateText(value)}
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
      <div className="input-container">
        <header>
          <nav>
            <i className="fa fa-trash-o"
                onClick={this.props.resetState}
                aria-hidden="true"></i>
            <a href="https://github.com/appacademy/slides">
              <i className="fa fa-github" aria-hidden="true"></i>
            </a>
          </nav>
          <nav>
            <Link className="header" to="/present">
              <i className="fa fa-tv" aria-hidden="true"></i>
            </Link>
          </nav>
        </header>
        <div className="codemirror-container" >
          {this.renderCodeMirror()}
        </div>
      </div>
    );
  }
}

export default EditView;
