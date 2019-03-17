import React from 'react';
import { Link } from 'react-router-dom';
import { Controlled as CodeMirror } from 'react-codemirror2';
require('codemirror/mode/markdown/markdown');
import { SLIDE_DELIMITER } from '../../util/slides';

class EditView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { syncSlideIndex: false };

    this.handleFilePick = this.handleFilePick.bind(this);
    this.handleFileDrop = this.handleFileDrop.bind(this);
    this.handleSyncSlideIndexChange = this.handleSyncSlideIndexChange.bind(this);
    this.handleCursorActivity = this.handleCursorActivity.bind(this);
  }

  componentDidMount() {
    this.refs.filepicker.addEventListener('change', this.handleFilePick);
    // document.body.addEventListener('drop', this.handleFileDrop);
  }

  componentWillUnmount() {
    this.refs.filepicker.removeEventListener('change', this.handleFilePick);
    // document.body.removeEventListener('drop', this.handleFileDrop);
  }

  handleFilePick(e) {
    const file = e.target.files[0];
    this.loadFile(file);
  }

  handleFileDrop(e) {
    const file = e.dataTransfer.items[0];
    if (file.kind === 'file') {
      e.preventDefault();
      this.loadFile(file.getAsFile());
    }
  }

  handleSyncSlideIndexChange(e) {
    this.setState({syncSlideIndex: !this.state.syncSlideIndex});
  }

  handleCursorActivity(cm) {
    if (!this.state.syncSlideIndex) return;

    const { line, ch } = cm.getCursor();
    const text = cm.getValue();

    let newlineIdx = 0;
    for (let i = 0; i < line; i++ ) {
      newlineIdx = text.indexOf("\n", newlineIdx) + 1;
    }
    const textUpToCursor = text.slice(0, newlineIdx + ch + 1);
    const cursorSlideIndex =
      (textUpToCursor.match(SLIDE_DELIMITER) || []).length;

    this.props.updateSlideIndex(cursorSlideIndex);
  }

  loadFile(file) {
    const reader = new FileReader();
    reader.onloadend = () => this.props.updateText(reader.result);
    reader.readAsText(file);
  }

  renderCodeMirror() {
    return (
      <CodeMirror
        ref="editor"
        value={this.props.text}
        onBeforeChange={
          (_editor, _data, value) => this.props.updateText(value)}
        onCursorActivity={this.handleCursorActivity}
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
            <input type="file" ref="filepicker" />
            <input type="checkbox" id="sync-slide-index"
                   checked={this.state.syncSlideIndex}
                   onChange={this.handleSyncSlideIndexChange} />
            <label htmlFor="sync-slide-index">Sync slide to cursor</label>
          </nav>
          <nav>
            <Link className="header" to="/present">
              <i className="fa fa-tv" aria-hidden="true"></i>
            </Link>
          </nav>
        </header>
        <div className="codemirror-container">
          {this.renderCodeMirror()}
        </div>
      </div>
    );
  }
}

export default EditView;
