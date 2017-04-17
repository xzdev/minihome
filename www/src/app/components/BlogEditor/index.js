import React, { Component, PropTypes } from 'react';

const renderPreview = function renderPreview() {
  return (
    <div>preview</div>
  );
};

const renderEditor = function renderEditor() {
  return (
    <div>
      <div>
        <div>Title:</div>
        <div><input /></div>
      </div>
      <div>
        <textarea />
      </div>
    </div>
  );
};

class BlogEditor extends Component {
  static propTypes = {
    content: PropTypes.object,
    onSubmit: PropTypes.func.isRequired,
  }

  static defaultProps = {
    content: {},
  }

  constructor(props) {
    super(props);
    this.state = {
      isPreview: false,
      content: props.content,
    };
  }

  render() {
    return (
      <div>
        <div>
          {
            this.state.isPreview ? renderPreview(this.state.content)
            : renderEditor(this.state.content)
          }
        </div>
        <div>
          <div>
            <button onClick={() => this.setState({ isPreview: !this.state.isPreview })}>
              { this.state.isPreview ? 'Edit' : 'Preview' }
            </button>
            <button onClick={() => this.props.onSubmit(this.state.content)}>Submit</button>
          </div>
        </div>
      </div>
    );
  }
}

export default BlogEditor;
