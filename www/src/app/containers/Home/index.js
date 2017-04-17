import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectBlogs } from '../appSelectors';
import Blog from '../../components/Blog';
import BlogEditor from '../../components/BlogEditor';
import Paginator from '../../components/Paginator';

const BLOG_PAGE_SIZE = 50;

class View extends Component {

  static propTypes = {
    appBootup: PropTypes.func.isRequired,
    blogs: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      editing: false,
    };
  }

  componentWillMount() {
    this.props.appBootup({
      pageIndex: 0,
    });
  }

  renderBlogs() {
    const { blogsMap, total } = this.props.blogs;
    const pageBlogs = [];
    for (let i = 0; i < BLOG_PAGE_SIZE; i += 1) {
      const blog = blogsMap[i];
      if (blog) {
        pageBlogs.push(blog);
      }
    }

    return (
      <div>
        {
          pageBlogs.map(blog => (
            <Blog blog={blog} key={blog.id} />
          ))
        }
        <Paginator selectedPage={0} total={total} gotoPage={() => {}} />
      </div>
    );
  }

  renderEditor(index) {
    const blog = this.props.blogs[index] || {};
    return (
      <BlogEditor onSubmit={() => {}} content={blog} />
    );
  }

  render() {
    return (
      <div>
        <div>
          <button onClick={() => this.setState({ editing: false })}>Blogs</button>
          <button onClick={() => this.setState({ editing: true })}>Post</button>
        </div>
        { this.state.editing ? this.renderEditor(-1) : this.renderBlogs() }
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  blogs: selectBlogs,
});

function mapDispatchToProps(dispatch) {
  return {
    appBootup: (options) => { dispatch({ type: 'APPLICATION_BOOT_REQUESTED', payload: options }); },
  };
}

const HomeView = connect(mapStateToProps, mapDispatchToProps)(View);

export default HomeView;
