import React, { Component, PropTypes } from 'react';
import ReactMarkdown from 'react-markdown';

class BlogEditor extends Component {
  static propTypes = {
    blog: PropTypes.object,
    onSubmit: PropTypes.func.isRequired,
  }

  static defaultProps = {
    blog: {
      title: '',
      content: '',
    },
  }

  constructor(props) {
    super(props);
    const blog = props.blog;

    this.state = {
      isPreview: false,
      title: blog.title,
      blog: blog.blog,
    };

    this.updateTitle = this.updateTitle.bind(this);
    this.updateContent = this.updateContent.bind(this);
  }

  updateContent(evt) {
    this.setState({
      content: evt.target.value,
    });
  }

  updateTitle(evt) {
    this.setState({
      title: evt.target.value,
    });
  }

  renderPreview() {
    return (
      <div>
        <div>{this.state.title}</div>
        <ReactMarkdown source={this.state.content} />
      </div>
    );
  }

  renderEditor() {
    return (
      <div>
        <div>
          <div>Title:</div>
          <div>
            <input onChange={this.updateTitle} value={this.state.title} />
          </div>
        </div>
        <div>
          <textarea onChange={this.updateContent} value={this.state.content} />
        </div>
      </div>
    );
  }

  render() {
    const blog = {
      title: this.state.title,
      content: this.state.content,
    };

    return (
      <div>
        <div>
          {
            this.state.isPreview ? this.renderPreview() : this.renderEditor()
          }
        </div>
        <div>
          <div>
            <button onClick={() => this.setState({ isPreview: !this.state.isPreview })}>
              { this.state.isPreview ? 'Edit' : 'Preview' }
            </button>
            <button onClick={() => this.props.onSubmit(blog)}>Submit</button>
          </div>
        </div>
      </div>
    );
  }
}

export default BlogEditor;
